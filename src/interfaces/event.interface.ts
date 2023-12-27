import mongoose, { Document } from 'mongoose';

export type TypeDayOfWeek =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';

export interface IEvent extends Document {
    description: string;
    dayOfWeek: TypeDayOfWeek;
    userId: mongoose.ObjectId;
}

export interface IReturnEvent extends IEvent {
    _id: mongoose.ObjectId;
}
