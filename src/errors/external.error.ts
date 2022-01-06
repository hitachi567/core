import { ServerError } from './server.error';

export class ExternalError extends ServerError {

    constructor(message: string, details?: string) {
        super(message, details);

        this.type = 'external';
    }

}
