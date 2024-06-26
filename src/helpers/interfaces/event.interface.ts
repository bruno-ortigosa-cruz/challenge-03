import { Document } from 'mongoose';

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
}

export interface IEventWithId extends IEvent {
    userId: string;
}

export interface IReturnEventWithId extends IEventWithId {
    _id: string;
}

export interface IDeletedEvents {
    deletedEvents: IReturnEventWithId[];
}

export interface IDeleteResponse {
    acknowledged: boolean;
    deletedCount: number;
}

export interface IEventQuery {
    dayOfWeek?: TypeDayOfWeek;
    description?: string | { $regex: RegExp };
}
