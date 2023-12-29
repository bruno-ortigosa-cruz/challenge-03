import { NextFunction, Request as ExpressRequest, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

type TypeJwtResponse = { _id: string; email: string };

interface Request extends ExpressRequest {
    user?: TypeJwtResponse;
}

export class AuthMiddleware {
    constructor() {}

    public exec(req: Request, _: Response, next: NextFunction) {
        const header = req.headers.authorization;

        if (!header) {
            throw new Error('não tem token não meu querido');
        }
        console.log(header.startsWith('Bearer '));

        if (!header.startsWith('Bearer ')) {
            throw new Error('esse token ta zoado hein');
        }

        const token = header.replace('Bearer ', '');
        const secret = process.env.SECRET_KEY as Secret;

        req.user = verify(token, secret) as TypeJwtResponse;
        next();
    }
}
