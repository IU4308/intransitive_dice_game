class Arguments {
    errorMessages = {
        diceNumber: "There should be at least 3 dice",
        values: "Values must be positive integers",
        sidesNumber: "Each dice should have 6 sides",
    }

    error = "";

    constructor() {
        this.arguments = process.argv.slice(2);
    }
    
    proccessArguments() {
        if (this.notIntegers(this.arguments)) {
            this.addError(this.errorMessages.values);
            return;
        }
        if (this.arguments.length < 3) {
            this.addError(this.errorMessages.diceNumber);
            return;
        } 
        
        const parsedArguments = this.parseArguments(this.arguments);

        if (this.invalidSidesNumber(parsedArguments)) {
            this.addError(this.errorMessages.sidesNumber);
            return;
        }

        this.parsedArguments = parsedArguments;
        return true;
    }

    flat(array) {
        return array.join(',').split(",").map(el => Number(el));
    }

    notIntegers(array) {
        return this.flat(array).some(el => isNaN(el) || el < 1 || !Number.isInteger(el));
    }

    invalidSidesNumber(array) {
        return array.some(subarr => subarr.length !== 6);
    }

    parseArguments(array) {
        return array.map(el => el.split(',').map(el => Number(el)));
    }

    addError(message) {
        this.error = message;
    }
}

export default Arguments;