import Joi from 'joi';
import JoiDate from '@joi/date';
import { signUpStringSchema } from '../utils/validation-schema.util';

const DateJoi = Joi.extend(JoiDate);

const generalPattern = /^[\p{L} '’.-]+$/u;

export const userSignUpSchema = Joi.object({
    firstName: signUpStringSchema('First name', 2, 50, generalPattern),
    lastName: signUpStringSchema('Last name', 2, 50, generalPattern),
    birthDate: DateJoi.date().format(['YYYY-MM-DD']).required(),
    city: signUpStringSchema('City', 2, 75, generalPattern),
    country: signUpStringSchema('Country', 2, 75, generalPattern),
    email: Joi.string().trim().email().required(),
    password: Joi.string()
        .trim()
        .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/)
        .min(8)
        .max(50)
        .messages({
            'string.min': `Password must be at least 8 characters long`,
            'string.max': `Password must not exceed 50 characters`,
            'string.pattern.base': `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        })
        .required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const userSignInSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
});
