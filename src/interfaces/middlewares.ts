import * as Context from './context';
import * as Lib from './lib';

/**
 * middleware function
 * @param Body `request.body`
 * @param Locals `response.locals`
 * @param Returned returned type
 */
export type Middleware<Body = any, Locals extends Lib.Locals = Lib.Locals, Returned = void> = (
    request: Context.Request<Body, Locals>,
    response: Context.Response<Locals>,
    next: Lib.NextFunction
) => Returned;

/**
 * error middleware function
 * @param Body `request.body`
 * @param Locals `response.locals`
 * @param Returned returned type
 */
export type ErrorMiddleware<Body = any, Locals extends Lib.Locals = Lib.Locals, Returned = void> = (
    err: any,
    req: Context.Request<Body, Locals>,
    res: Context.Response<Locals>,
    next: Lib.NextFunction
) => Returned;
