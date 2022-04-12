import { ServerError } from './server.error';

export class DatabaseError extends ServerError {

    constructor()
    constructor(message: string)
    constructor(message: string, details: any)
    constructor(message: string = 'something went wrong', details?: any) {

        super(message, details);

        this.name = 'DatabaseError';
        this.type = 'database';
        this.stack = this.stack?.replace('ServerError', this.name);
    }

}
