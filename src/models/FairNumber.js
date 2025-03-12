import RandomGenerator from './RandomGenerator.js';

class FairNumber {
    constructor(length = 32, min = 0, max = 2) {
        this.key = RandomGenerator.generateKey(length);
        this.num = RandomGenerator.generateNumber(min, max);
        this.hmac = RandomGenerator.generateHmac(this.key, `${this.num}`);
    }
}

export default FairNumber;