import RandomGenerator from './RandomGenerator.js';

class FairNumber {
    constructor(length = 32, min = 0, max = 2) {
        this.key = RandomGenerator.generateKey(length);
        this.number = RandomGenerator.generateNumber(min, max);
        this.hash = RandomGenerator.generateHmac(this.key, `${this.number}`);
    }
}

export default FairNumber;