import { ServerError } from './server.error';

export class DatabaseError extends ServerError {

    constructor(message: string, details?: string) {
        super(message, details);

        this.type = 'database';
    }

}
