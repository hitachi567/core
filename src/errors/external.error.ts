import { ServerError } from './server.error';

export class ExternalError extends ServerError {

    constructor()
    constructor(message: string)
    constructor(message: string, details: any)
    constructor(message: string = 'something went wrong', details?: any) {

        super(message, details);

        this.name = 'ExternalError';
        this.type = 'external';
        this.stack = this.stack?.replace('ServerError', 'ExternalError');
    }

}
