class Probabilities {
    probabilites = [];

    constructor(dice) {
        this.probabilites = Array.from({ length: dice.length }, () => Array(dice.length).fill(0));

        for (let i = 0; i < dice.length; i++) {
            for (let j = 0; j < dice.length; j++) {
                let wins = 0;
                let count = 0;
                for (let k = 0; k < dice[i].length; k++) {
                    for (let m = 0; m < dice[j].length; m++) {
                        if (i !== j) {
                            if (dice[i][k] > dice[j][m]) {
                                wins++;
                            }
                            count++;
                        }
                    }
                }
                this.probabilites[i][j] = (wins / count).toFixed(2);
            }
        }

        return this.probabilites
    }
}

export default Probabilities;