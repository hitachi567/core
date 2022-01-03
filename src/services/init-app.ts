import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookie from 'cookie-parser';
import fingerprint from 'express-fingerprint';

export interface AppOptions {
    cookieSecret: string
}

export function initApp(options: AppOptions) {

    let app = express();

    app.use(helmet());
    app.use(cors());

    app.use(cookie(options.cookieSecret));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(fingerprint());

    return app;

}
