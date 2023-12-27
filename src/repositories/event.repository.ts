import { IEvent, IReturnEvent } from '../interfaces/event.interface';
import { EventModel } from './models/event.model';

export class EventRepository {
    constructor() {}

    public async getAllEvents(): Promise<IEvent[]> {
        return await EventModel.find({});
    }

    public async getQueryEvents(query: string): Promise<IEvent[]> {
        return await EventModel.find({ dayOfWeek: query });
    }

    public async createEvent(payload: IEvent): Promise<IReturnEvent> {
        return await EventModel.create(payload);
    }
}
