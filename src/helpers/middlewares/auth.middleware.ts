import { NextFunction, Request as ExpressRequest, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

type TypeJwtResponse = { _id: string; email: string };

interface Request extends ExpressRequest {
    user?: TypeJwtResponse;
}

export class AuthMiddleware {
    public exec(req: Request, _: Response, next: NextFunction) {
        const header = req.headers.authorization;

        if (!header) {
            throw new UnauthorizedError('User not logged in');
        }

        if (!header.startsWith('Bearer ')) {
            throw new UnauthorizedError('User not logged in');
        }

        const token = header.replace('Bearer ', '');
        const secret = process.env.SECRET_KEY as Secret;

        req.user = verify(token, secret) as TypeJwtResponse;
        next();
    }
}
