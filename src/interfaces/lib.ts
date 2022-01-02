import * as core from 'express-serve-static-core';

/**
 * as same as `ParamsDictionary` from `express-serve-static-core` module
 */
export interface ParamsDictionary extends core.ParamsDictionary { }

/**
 * as same as `express.Query`
 */
export interface Query extends core.Query { }

/**
 * as same as `express.NextFunction`
 */
export interface NextFunction extends core.NextFunction { }

/**
 * as same as `express.CookieOptions`
 */
export interface CookieOptions extends core.CookieOptions { }

/**
 * locals for `Response`
 * @example
 * interface Locals extends Lib.Locals {
 *     name: string;
 * }
 *
 * function getName(response: Response<Locals>) {
 *     return response.locals.name;
 * }
 */
export interface Locals extends Record<string, any> { }

export type Methods = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
