class Arguments {
    messages = {
        invNum: "There should be at least 3 dice",
        invVal: "Values must be positive integers",
        invSidesNum: "Each dice should have 6 sides",
    }

    error = "";

    constructor() {
        this.args = process.argv.slice(2);
    }
    
    proccessArguments() {
        if (this.notIntegers(this.args)) {
            this.addError(this.messages.invVal);
            return;
        }
        if (this.args.length < 3) {
            this.addError(this.messages.invNum);
            return;
        } 
        
        const parsedArgs = this.parseArguments(this.args);

        if (this.invalidSidesNumber(parsedArgs)) {
            this.addError(this.messages.invSidesNum);
            return;
        }

        this.parsedArguments = parsedArgs;
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