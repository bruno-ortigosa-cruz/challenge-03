import { model } from 'mongoose';
import { IEventWithId } from '../../../helpers/interfaces/event.interface';
import { EventSchema } from '../schemas/event.schema';

export const EventModel = model<IEventWithId>('Event', EventSchema);
