import { ServerError } from './server.error';

export class ApiError extends ServerError {

    status: number = 500;

    constructor(message: string, status: number, details?: any) {
        super(message, details);

        this.type = 'api';
        this.status = status;
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

    static handle(error: ApiError): ApiError {

        if (error instanceof ApiError) {
            return error;
        }

        let err = super.handle(error);
        let returned = ApiError.InternalServerError(err.message, err.details);
        returned.stack = err.stack;

        return returned;

    }
}
