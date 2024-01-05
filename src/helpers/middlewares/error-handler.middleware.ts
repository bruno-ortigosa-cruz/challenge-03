import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom.error';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from '../errors/validation.error';
import { GenericError } from '../errors/generic.error';

export class ErrorHandlerMiddleware {
    constructor() {
        this.exec = this.exec.bind(this);
    }

    public exec(
        error: unknown,
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        if (!error) return next();

        if (error instanceof CustomError || error instanceof GenericError) {
            res.status(error.statusCode).json(error.getError());
        } else if (error instanceof ValidationError) {
            res.status(StatusCodes.BAD_REQUEST).json(error.getError());
        } else {
            this.exec(new GenericError(error), req, res, next);
        }
    }
}
