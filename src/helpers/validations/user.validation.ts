import Joi from 'joi';
import JoiDate from '@joi/date';
import { dynamicStringSchema } from '../utils/validation-schema.util';

const DateJoi = Joi.extend(JoiDate);

const generalPattern = /^[\p{L} '’.-]+$/u;
const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;

export const userSignUpSchema = Joi.object({
    firstName: dynamicStringSchema('First name', 2, 50, generalPattern),
    lastName: dynamicStringSchema('Last name', 2, 50, generalPattern),
    birthDate: DateJoi.date().format('YYYY-MM-DD').required().messages({
        'date.format': `Birth date must be in the 'YYYY-MM-DD' format`,
    }),
    city: dynamicStringSchema('City', 2, 75, generalPattern),
    country: dynamicStringSchema('Country', 2, 75, generalPattern),
    email: Joi.string().trim().email().required(),
    password: dynamicStringSchema('Password', 8, 50, passwordPattern),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': `ConfirmPassword must match Password`,
        }),
});

export const userSignInSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: dynamicStringSchema('Password', 8, 50, passwordPattern),
});
