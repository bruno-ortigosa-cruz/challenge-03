import mongoose, { Document } from 'mongoose';

export type DayOfWeek =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';

export interface IEvent extends Document {
    description: string;
    dayOfWeek: DayOfWeek;
    userId: mongoose.ObjectId;
}

export interface IReturnEvent extends IEvent {
    _id: mongoose.ObjectId;
}
