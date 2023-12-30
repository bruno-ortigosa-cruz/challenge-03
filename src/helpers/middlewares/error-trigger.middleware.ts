import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ValidationError } from 'joi';
import { BadRequestError, ConflictError, InternalServerError } from '../errors';
import { CustomError } from '../errors/main.error';

export class ErrorTriggerMiddleware {
    constructor() {
        this.exec = this.exec.bind(this);
    }

    public exec(error: unknown, _: Request, __: Response, next: NextFunction) {
        if (error instanceof mongoose.Error.CastError) {
            throw new BadRequestError('Invalid Id');
        }
        if (error instanceof mongoose.mongo.MongoServerError) {
            if (error.code === 11000) {
                throw new ConflictError('Email already taken');
            }
        }
        if (
            !(error instanceof CustomError || error instanceof ValidationError)
        ) {
            throw new InternalServerError();
        }
        next(error);
    }
}
