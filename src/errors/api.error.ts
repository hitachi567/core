import { IsInt } from 'class-validator';
import { ServerError } from './server.error';
import { Validation } from '../services';

export class ApiError extends ServerError {

    @IsInt()
    status: number;

    constructor()
    constructor(message: string)
    constructor(message: string, status: number)
    constructor(message: string, status: number, details: any)
    constructor(
        message: string = 'something went wrong',
        status: number = 500,
        details?: any
    ) {

        super(message, details);

        this.name = 'ApiError';
        this.type = 'api';
        this.status = status;
        this.stack = this.stack?.replace('ServerError', this.name);
    }

    static BadRequest(message?: string, details?: any) {
        return new ApiError(message || 'Bad Request', 400, details);
    }

    static Unauthorized(message?: string, details?: any) {
        return new ApiError(message || 'Unauthorized', 401, details);
    }

    static Forbidden(message?: string, details?: any) {
        return new ApiError(message || 'Forbidden', 403, details);
    }

    static NotFound(message?: string, details?: any) {
        return new ApiError(message || 'Not Found', 404, details);
    }

    static InternalServerError(message?: string, details?: any) {
        return new ApiError(message || 'Internal Server Error', 500, details);
    }

    static async handle(error: any): Promise<ApiError> {

        if (error === undefined || error === null) {
            return ApiError.InternalServerError();
        }

        switch (typeof error) {
            case 'string':
                return ApiError.InternalServerError(error);
            case 'boolean':
            case 'bigint':
            case 'number':
            case 'symbol':
                return ApiError.InternalServerError(error.toString());
        }

        let err = new ApiError()

        err.type = error.type;
        err.name = error.name;
        err.message = error.message;
        err.stack = error.stack;
        err.details = error.details;
        err.status = error.status;

        let validationErrors = await Validation.validate(err)

        if (validationErrors.length === 0) {
            return err;
        }

        return ApiError.InternalServerError(undefined, error);

    }
}
