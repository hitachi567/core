import { Middleware } from '../interfaces';
import * as Lib from '../interfaces/lib';

export function asyncMiddleware<Body = any, Locals extends Lib.Locals = Lib.Locals>(
    middleware: Middleware<Body, Locals>
): Middleware<Body, Locals> {
    return async (request, response, next) => {

        try {

            await middleware(request, response, next);

        } catch (error) {

            next(error);

        }

    }
}
