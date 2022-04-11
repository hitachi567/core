import { randomBytes, randomInt, randomUUID } from 'crypto';

/**
 * represents methods based `crypto` module, which returns random value 
 */
export class Generator {

    /**
     * as same as `crypto.randomUUID`
     * @returns random RFC 4122 version 4 UUID,
     * which generated using a cryptographic pseudorandom number generator.
     */
    static uuid() {
        return randomUUID();
    }

    /**
     * generates cryptographically strong pseudorandom sequence.
     * based `crypto.randomBytes`
     * @param size number of characters in returned string.
     * The `size` is a multiple of 2.
     */
    static sequence(size: number): string {

        const max = 2 ** 30;

        if (size > max) {
            return this.sequence(max) + this.sequence(size - max);
        }

        return randomBytes(size / 2).toString('hex');
    }

    /**
     * range (`max - min`) must be less than 248.
     * `min` and `max` must be safe integers.
     * based `crypto.randomBytes`
     * @param min start of random range (inclusive).
     * @param max end of random range (exclusive).
     * @returns random integer `n` such that `min <= n < max`
     */
    static int(min: number, max: number) {
        return randomInt(min, max);
    }
    /**
     * generates pseudorandom numeric sequence.
     * based `crypto.randomBytes`
     * @param size number of characters in returned string.
     */
    static code(size: number): string {

        const max = 10;

        if (size > max) {
            return this.code(max) + this.code(size - max);
        }

        return Math.random().toString().substring(2, size + 2)

    }

}
