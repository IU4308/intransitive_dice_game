import Arguments from './Arguments.js';

class Dice extends Arguments {
    constructor() {
        super();
        this.dice = this.proccessArguments() ? this.parsedArguments : [];
    }
}

export default Dice;