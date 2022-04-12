import { IsOptional, IsString } from "class-validator";
import Validation from '../services/validation';

export class ServerError {

    @IsString()
    public type: string;

    @IsString()
    public name: string;

    @IsString()
    public message: string;

    @IsOptional()
    @IsString()
    public stack?: string;

    public details?: any;

    constructor()
    constructor(message: string)
    constructor(message: string, details: any)
    constructor(message: string = 'something went wrong', details?: any) {

        let error = new Error(message);

        error.name = 'ServerError'
        this.name = error.name;
        this.type = 'server';
        this.message = error.message;
        this.stack = error.stack;
        this.handleStack()
        this.details = details;
    }

    protected handleStack() {
        let array = this.stack?.split('\n') || [];
        array = [
            ...array.slice(0, 1),
            ...array.slice(2)
        ];

        let result = '';
        for (const string of array) {
            result += string + '\n';
        }
        this.stack = result;
    }

    static async handle(error: any): Promise<ServerError> {

        if (error === undefined || error === null) {
            return new ServerError();
        }

        switch (typeof error) {
            case 'string':
                return new ServerError(error);
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'symbol':
                return new ServerError(error.toString());
        }

        let err = new ServerError()

        err.type = error.type;
        err.name = error.name;
        err.message = error.message;
        err.stack = error.stack;
        err.details = error.details;

        let validationErrors = await Validation.validate(err)

        if (validationErrors.length === 0) {
            return err;
        }

        if (error instanceof Error) {
            let returned = new ServerError(error.message);
            returned.stack = error.stack;

            return returned;
        }

        return new ServerError('unexpected error', error);

    }

}
