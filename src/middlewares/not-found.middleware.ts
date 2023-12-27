import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class EndpointNotFound {
    constructor() {}

    public fallback(_: Request, res: Response) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: 'Route does not exist',
        });
    }
}
