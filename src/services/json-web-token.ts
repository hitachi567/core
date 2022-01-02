import Generator from './generator';
import jwt from 'jsonwebtoken';

export interface TokenPayload extends Record<string, string> { }

export interface JwtSecrets extends TokensPair { }

export interface TokensPair {
    access: string;
    refresh: string;
}

export interface SignOptions {
    access: jwt.SignOptions;
    refresh: jwt.SignOptions;
}

export default class JsonWebToken<Payload extends TokenPayload = TokenPayload> {

    constructor(protected secrets: JwtSecrets) {

    }

    updateSecrets(secrets: JwtSecrets) {

        this.secrets = secrets;

    }

    static generateJwtSecrets(): JwtSecrets {

        return {
            access: Generator.sequense(40),
            refresh: Generator.sequense(40)
        }

    }

    generateTokensPair(payload: Payload, options: SignOptions): TokensPair {

        return {
            access: jwt.sign(payload, this.secrets.access, options.access),
            refresh: jwt.sign(payload, this.secrets.refresh, options.refresh)
        }

    }

    decodeToken(token: string) {

        return jwt.decode(token) as any;

    }

    verifyAccess(token: string) {

        return jwt.verify(token, this.secrets.access) as any;

    }

    verifyRefresh(token: string) {

        return jwt.verify(token, this.secrets.refresh) as any;

    }

}
