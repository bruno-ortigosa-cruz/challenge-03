import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/main.error';
import { ValidationError } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ICustomError, IValidationError } from '../interfaces/error.interface';

export class ErrorHandlerMiddleware {
    constructor() {
        this.exec = this.exec.bind(this);
    }

    public exec(error: unknown, _: Request, res: Response, next: NextFunction) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json(this.returnCustomError(error));
            return;
        }
        if (error instanceof ValidationError) {
            res.status(StatusCodes.BAD_REQUEST).json(
                this.returnValidationError(error),
            );
            return;
        }

        next();
    }

    private returnCustomError(error: CustomError): ICustomError {
        return {
            statusCode: error.statusCode,
            message: error.message,
            error: error.error,
        };
    }

    private returnValidationError(error: ValidationError): IValidationError {
        const errors = error.details.map((error) => {
            return {
                resource: `${error.path}`,
                message: error.message.replace(/"/g, "'"),
            };
        });
        return {
            type: 'Validation Error',
            errors,
        };
    }
}
