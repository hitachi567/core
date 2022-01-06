# Core

[hitachi567](https://github.com/hitachi567) <<a href="mailto:abidai790@gmail.com">abidai790@gmail.com</a>>

Wrapper for express based app

## Requirements

- node.js
- npm or yarn

## Getting started

```bash
npm install @hitachi567/core

# or

yarn add @hitachi567/core
```

## Usage

### Initialize express app

```typescript
import { initApp } from '@hitachi567/core';

const app = initApp({
    cookieSecret: 'secret'
});

app.listen(5000, () => console.log('listening on 5000...'));
```

### Define middleware

```typescript
import Lib from '@hitachi567/core';
import { Router } from 'express';

interface Body {
    username: string;
    password: string;
}

interface Locals extends Lib.Locals {
    hashedPassword: string;
}

let tryPartOfMiddleware: Lib.Middleware<Body, Locals> = async (request, response, next) => {

    let hashedPassword = await Lib.Hashing.hashing(request.body.password);

    response.locals.hashedPassword = hashedPassword;

    next();

}

let middleware1 = Lib.asyncMiddleware<Body, Locals>(tryPartOfMiddleware);

let middleware2: Lib.Middleware<Body, Locals> = async (request, response, next) => {
    try {

        await tryPartOfMiddleware(request, response, next);

    } catch (error) {

        next(error);

    }
}

function middleware3(): Lib.Middleware<Body, Locals> {
    return Lib.asyncMiddleware<Body, Locals>(tryPartOfMiddleware);
}

// the expressions below are equivalent to each other
Router().use(middleware1);
Router().use(middleware2);
Router().use(middleware3());
```

## Links

- [github.com](https://github.com/hitachi567/core)
- [npmjs.com](https://www.npmjs.com/package/@hitachi567/core)
