import Joi, { StringSchema } from 'joi';

export const dynamicStringSchema = (
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
        .required()
        .messages({
            'string.min': `${field} must be at least ${min} characters long`,
            'string.max': `${field} must not exceed ${max} characters`,
            'string.pattern.base':
                field === 'Password'
                    ? `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
                    : `The ${field} provided, '{#value}', contains not supported characters.`,
        });
};

export const dayOfWeekSchema = (): StringSchema => {
    return Joi.string()
        .valid(
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        )
};
