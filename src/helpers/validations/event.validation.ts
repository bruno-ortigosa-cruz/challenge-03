import Joi from 'joi';

export const createEventSchema = Joi.object({
    description: Joi.string().min(2).max(600),
    dayOfWeek: Joi.string().valid(
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ),
});
