import { Generator } from '../services';
import { Middleware, Locals } from '../interfaces';
import { day } from '../services/day';

export interface TaggedLoclas extends Locals {
    fingerprint: string;
    ip: string;
}

export function taggingMiddleware(): Middleware {
    return (requset, response, next) => {

        let fingerprint: string;
        let id = 'id';

        if (requset.fingerprint) {

            fingerprint = requset.fingerprint.hash;

        } else if (requset.signedCookies[id]) {

            fingerprint = requset.signedCookies[id];

        } else {

            fingerprint = Generator.sequence(32);

        }

        response.locals.ip = requset.ip;
        response.locals.fingerprint = fingerprint;

        response.cookie(id, fingerprint, {
            httpOnly: true,
            signed: true,
            maxAge: 30 * day('ms'),
        });

        next();

    }
}
