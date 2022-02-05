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
    setTimeout(
        key: string,
        callback: (key: string) => Promise<void>
    ): Promise<void>;
    /**
     * sets a timer which executes a function once the timer expires
     * @param key identificator
     * @param callback asynchronous function that is executed when the timer expires
     * @param ms number of milliseconds after which the timer will expire
     */
    setTimeout(
        key: string,
        callback: (key: string) => Promise<void>,
        ms: number
    ): Promise<void>;
    setTimeout(
        key: string,
        callback: (key: string) => Promise<void>,
        ms?: number
    ): Promise<void> {

        this.validator_setTimeout(key, ms, callback);

        if (typeof ms === 'undefined') {

            ms = 7 * day('ms');

        }

        return this._setTimeout(key, ms, callback);

    }

    protected validator_setTimeout(
        key: string,
        ms: number | undefined,
        callback: (key: string) => Promise<void>
    ) {

        if (typeof key !== 'string') {

            throw new TypeError('"key" must be a string');

        }

        if (typeof callback !== 'function') {

            throw new TypeError('"callback" must be a function');

        }

        if (typeof ms !== 'number' && typeof ms !== 'undefined') {

            throw new TypeError('ms must be a number');

        }

    }

    protected _setTimeout(
        key: string,
        ms: number,
        callback: (key: string) => Promise<void>
    ): Promise<void> {

        if (typeof ms === 'undefined') {

            ms = 7 * day('ms');

        }

        if (this.timeouts.has(key)) {

            throw new Error('timeout with this identificator already exists');

        }

        return new Promise((resolve, reject) => {
            let cb = () => {
                try {

                    callback(key).then(v => resolve(v));

                } catch (error) {

                    reject(error);

                } finally {

                    this.timeouts.delete(key);

                }
            }

            let timout = setTimeout(cb, ms);
            this.timeouts.set(key, timout);
        });

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

        if (timeout) {
            clearTimeout(timeout);
            this.timeouts.delete(key);
        }

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

    get(key: string): NodeJS.Timeout | undefined {
        return this.timeouts.get(key);
    }

    has(key: string): boolean {
        return this.timeouts.has(key);
    }

}
