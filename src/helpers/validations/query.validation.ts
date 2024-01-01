import Joi from 'joi';
import { dayOfWeekSchema } from '../utils/validation-schema.util';

export const getEventQuery = Joi.object({
    description: Joi.string().min(2).max(600),
    dayOfWeek: dayOfWeekSchema(),
});

export const deleteEventQuery = Joi.object({
    dayOfWeek: dayOfWeekSchema().required(),
});
