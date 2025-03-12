import { randomBytes, randomInt, createHmac } from 'crypto';

class RandomGenerator {
    static generateKey(length) {
        return randomBytes(length).toString('hex');
    }

    static generateNumber(min, max) {
        return randomInt(min, max);
    }

    static generateHmac(key, message) {
        return createHmac('sha256', key).update(message).digest('hex');
    }
}

export default RandomGenerator;