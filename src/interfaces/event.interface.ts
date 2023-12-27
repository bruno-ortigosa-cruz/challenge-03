import mongoose, { Document } from 'mongoose';

type DayOfWeek =
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
}

export interface IReturnEvent extends IEvent {
    _id: mongoose.ObjectId;
    userId: mongoose.ObjectId;
}
