import { Schema } from 'mongoose';
import { IEventWithId } from '../../../helpers/interfaces/event.interface';

export const EventSchema = new Schema<IEventWithId>(
    {
        description: {
            type: String,
        },
        dayOfWeek: {
            type: String,
        },
        userId: {
            type: String,
        },
    },
    { versionKey: false },
);
