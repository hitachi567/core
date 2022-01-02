import * as express from 'express';
import * as Lib from './lib';

/**
 * lightweight generic `express.Request`
 * @param Body `request.body`
 * @param Locals `response.locals`
 */
export interface Request<Body = any, Locals extends Lib.Locals = Lib.Locals> extends express.Request<
    Lib.ParamsDictionary,
    any,
    Body,
    Lib.Query,
    Locals
> { }

/**
 * lightweight generic `express.Response`
 * @param Locals `response.locals`
 */
export interface Response<Locals extends Lib.Locals = Lib.Locals> extends express.Response<any, Locals> { }
