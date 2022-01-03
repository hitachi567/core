import { day } from './day';

/**
 * implements timer functions with saving in memory
 */
export class Timeout {

    private timeouts = new Map<string, NodeJS.Timeout>();

    /**
     * sets a timer which executes a function once after 7 days
     * @param key identificator
     * @param callback asynchronous function that is executed when the timer expires
     */
    setTimeout(key: string,
        callback: (key: string) => Promise<void>): void;
    /**
     * sets a timer which executes a function once the timer expires
     * @param key identificator
     * @param callback asynchronous function that is executed when the timer expires
     * @param ms number of milliseconds after which the timer will expire
     */
    setTimeout(key: string,
        callback: (key: string) => Promise<void>, ms: number): void;
    setTimeout(key: string,
        callback: (key: string) => Promise<void>, ms?: number): void {

        if (typeof key !== 'string') {

            throw new TypeError('key must be a string');

        }

        if (typeof callback !== 'function') {

            throw new TypeError('callback must be a function');

        }

        if (typeof ms === 'undefined') {

            ms = 7 * day('ms');

        } else if (typeof ms !== 'number') {

            throw new TypeError('ms must be a number');

        }

        if (this.timeouts.has(key)) {

            throw new Error('timeout already exists with this identificator');

        }

        let callbackWrapper = async () => {
            try {
                await callback(key);
            } finally {
                this.timeouts.delete(key);
            }
        }

        let timout = setTimeout(callbackWrapper, ms);
        this.timeouts.set(key, timout);

    }

    /**
     * cancels the previously set timeout
     * @param key identificator
     */
    clearTimeout(key: string): void {

        if (typeof key !== 'string') {
            throw new TypeError('key must be a string')
        }

        const timeout = this.timeouts.get(key);

        if (!timeout) {
            throw new Error('timeout not found');
        }

        clearTimeout(timeout);
        this.timeouts.delete(key);

    }

    /**
     * cancels all the previously set timeout
     */
    reset(): void {

        this.timeouts.forEach(
            timeout => clearTimeout(timeout)
        );
        this.timeouts.clear();

    }

}
