import { stdin, stdout, exit } from 'process';
import readline from 'readline/promises';
import Dice from '../models/Dice.js';
import FairNumber from '../models/FairNumber.js';
import Table from '../utils/Table.js';
import RandomGenerator from '../models/RandomGenerator.js';

class Game {
    queries = {
        guess: 'Try to guess my selection.\n0 - 0\n1 - 1\nX - exit\n? - help\n',
        add: 'Add your number modulo 6\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\n',
    }
    valid = true;

    constructor() {
        const diceConfig = new Dice();
        this.dice = diceConfig.dice;
        this.probabilites = new Table(diceConfig);
        if (diceConfig.error) {
            console.log(diceConfig.error);
            exit();
        }
        this.secret = new FairNumber();
        this.readline = readline.createInterface({
            input: stdin,
            output: stdout,
        });
    }

    async startGame() {
        await this.output(["Let's determine who makes the first move."]);
        this.answer = await this.askUser(1, this.queries.guess);
        this.result = (this.secret.number + Number(this.answer)) % 2;
        await this.outputGuessResult(this.result, 2);
        if (this.result) {
            await this.output([`Your guess is wrong. I choose first`]);
            this.computerChoose();
            await this.userChoose();
        } else {
            await this.output(['Your guess is right. You choose first']);
            await this.userChoose();
            await this.computerChoose();
        }
        await this.computerThrow();
        await this.userThrow();
        await this.gameResult();
    }

    async gameResult() {
        if (this.computerResult > this.userResult) {
            await this.output([`You lose (${this.userResult} < ${this.computerResult})`]);
        } else {
            await this.output([`You win (${this.userResult} > ${this.computerResult})`]);
        }
        this.readline.close();
    }

    async computerChoose() {
        const selectedIndex = RandomGenerator.generateNumber(0, this.dice.length);
        this.computerDie = this.dice[selectedIndex];
        this.updateDice(selectedIndex);
        await this.output([`I choose the [${this.computerDie}] die.`]);
    }

    async userChoose() {
        this.answer = await this.askUser(this.dice.length - 1, 
            "Choose your dice:\n" +
            this.renderRemainedDice() + '\nX - exit\n? - help\n',
            false
        );
        this.userDie = this.dice[this.answer];
        await this.output([`You chose the [${this.userDie}]`]);
    }

    async askUser(max, query = '', isGuess = true) {
        if (isGuess) {
            await this.output([
                `I selected a random value in the range 0..${max}.`,
                `(HMAC=${this.secret.hash})`
            ]);
        }
        let answer = await this.readline.question(query);
        this.validate(answer, max);
        while (!this.valid) {
            answer = await this.readline.question('Invalid input\nTry again\n');
            this.validate(answer, max);
        }
        if (answer === '?') {
            console.log('Probability of the win for the user:');
            console.log(this.probabilites.toString());
            await this.readline.question('Continue?\n');
            answer = await this.askUser(max, query, isGuess);
        }
        return answer;
    }

    async computerThrow() {
        await this.throwDie(`It's time for my throw`);
        this.computerResult = this.computerDie[this.result];
        await this.output([`My throw is ${this.computerResult}`]);
    }

    async userThrow() {
        await this.throwDie(`It's time for your throw`);
        this.userResult = this.userDie[this.result];
        await this.output([`Your throw is ${this.userResult}`]);
    }

    async throwDie(message) {
        await this.output([message]);
        this.secret = new FairNumber(32, 0, 6);
        this.answer = await this.askUser(5, this.queries.add);
        if (this.answer.toLowerCase() === 'x') {
            this.readline.close();
        }
        this.result = (this.secret.number + Number(this.answer)) % 6;
        await this.outputGuessResult(this.result, 6);
    }

    validate(input, max) {
        this.valid = false;
        if (input.toLowerCase() === 'x') {
            exit();
        }
        const validValues = Array.from({ length: max + 1 }, (_, i) => i.toString()).concat('x', '?');
        if (!validValues.includes(input)) {
            this.valid = false;
            return;
        }
        this.valid = true;
    }

    async outputGuessResult(result, mod) {
        await this.output([
            `Your selection: ${this.answer}`,
            `My selection: ${this.secret.number}\n(KEY=${this.secret.key})`,
            `The result is ${this.secret.number} + ${this.answer} = ` +
            `${result} (mod ${mod}).`
        ])
    }  

    updateDice(index) {
        this.dice.splice(index, 1);
    }

    renderRemainedDice() {
        return this.dice.map((die, index) => `${index} - [${die}]`).join(',').replaceAll('],', ']\n');
    }

    async output(messages) {
        for (const message of messages) {
            this.readline.write(`${message}\n`);
            await this.delay(500);
        }
    }

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}

export default Game;