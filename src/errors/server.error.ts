
export class ServerError extends Error {

    public type: string;
    public details?: any;

    constructor()
    constructor(message: string)
    constructor(message: string, details: any)
    constructor(message: string = 'something was wrong', details?: any) {
        super(message);

        this.type = 'server';
        this.details = details;
    }

    static handle(error: any) {

        if (error instanceof this) {
            return error;
        }

        if (error instanceof Error) {
            let returned = new this(error.message);
            returned.stack = error.stack;

            return returned;
        }

        switch (typeof error) {
            case 'string':
                return new this(error);
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'symbol':
                return new this(error.toString());
        }

        return new this('unexpected error', error);

    }

}
