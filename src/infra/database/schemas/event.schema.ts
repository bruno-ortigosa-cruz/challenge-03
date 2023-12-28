import mongoose, { Schema } from 'mongoose';
import { IEvent } from '../../../helpers/interfaces/event.interface';

export const EventSchema = new Schema<IEvent>(
    {
        description: {
            type: String,
        },
        dayOfWeek: {
            type: String,
        },
        userId: {
            type: mongoose.Types.ObjectId,
        },
    },
    { versionKey: false },
);
