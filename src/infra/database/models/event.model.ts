import { model } from 'mongoose';
import { IEvent } from '../../../helpers/interfaces/event.interface';
import { EventSchema } from '../schemas/event.schema';

export const EventModel = model<IEvent>('Event', EventSchema);
