import { Generator } from '../services';
import { Middleware, Locals } from '../interfaces';

export interface TaggedLoclas extends Locals {
    fingerprint: string;
    ip: string;
}

export function taggingMiddleware(): Middleware {
    return (requset, response, next) => {

        let fingerprint: string;

        if (requset.fingerprint) {

            fingerprint = requset.fingerprint.hash;

        } else {

            fingerprint = Generator.sequense(32);

        }

        response.locals.ip = requset.ip;
        response.locals.fingerprint = fingerprint;

        next();

    }
}
