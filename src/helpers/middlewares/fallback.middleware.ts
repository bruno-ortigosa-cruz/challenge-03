import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class FallbackMiddleware {
    public exec(_: Request, res: Response) {
        const message = {
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Route does not exist',
            error: 'Not Found',
        };

        res.status(StatusCodes.NOT_FOUND).json(message);
    }
}
