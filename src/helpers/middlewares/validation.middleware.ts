import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidationError } from '../errors/validation.error';

export class ValidationMiddleware {
    public exec(schema: Joi.ObjectSchema, query: boolean = false) {
        return (req: Request, _: Response, next: NextFunction) => {
            if (query) {
                const { error: paramError } = schema.validate(req.query, {
                    abortEarly: false,
                });
                
                if (!paramError) return next();

                throw new ValidationError(paramError);
            } else {
                const { error } = schema.validate(req.body, {
                    abortEarly: false,
                });

                if (!error) return next();

                throw new ValidationError(error);
            }
        };
    }
}
