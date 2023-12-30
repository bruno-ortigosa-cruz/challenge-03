import Joi, { StringSchema } from 'joi';

export const signUpStringSchema = (
    field: string,
    min: number,
    max: number,
    pattern: RegExp,
): StringSchema => {
    return Joi.string()
        .trim()
        .pattern(pattern)
        .min(min)
        .max(max)
        .messages({
            'string.min': `${field} must be at least ${min} characters long`,
            'string.max': `${field} must not exceed ${max} characters`,
            'string.pattern.base': `The ${field} provided, '{#value}', contains not supported characters.`,
        })
        .required();
};
