import { Middleware, Locals } from '../interfaces';

export interface LocalsWithCookies extends Locals {

    cookies: Record<string, string | undefined>;

}

export function checkCookie(name: string): Middleware<any, LocalsWithCookies> {
    return (request, response, next) => {

        if (!response.locals.cookies) {

            response.locals.cookies = {};

        }

        let value = request.signedCookies[name];

        if (typeof value === 'string') {

            response.locals.cookies[name] = value;

        } else {

            response.locals.cookies[name] = undefined;

        }

        next();

    }
}

export function clearCookie(name: string): Middleware {
    return (request, response, next) => {

        response.clearCookie(name);

        next();

    }
}

