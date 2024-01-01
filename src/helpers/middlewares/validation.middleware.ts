import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationError } from '../errors/validation.error';

export class ValidationMiddleware {
    public exec(schema: Joi.ObjectSchema) {
        return (req: Request, _: Response, next: NextFunction) => {
            const { error } = schema.validate(req.body, { abortEarly: false });

            if (error) throw new ValidationError(error);

            next();
        };
    }
}
