import { IEvent, IReturnEvent } from '../interfaces/event.interface';
import { EventModel } from './models/event.model';

export class EventRepository {
    constructor() {}

    public async getAllEvents(): Promise<IEvent[]> {
        return await EventModel.find({});
    }

    public async createEvent(payload: IEvent): Promise<IReturnEvent> {
        console.log(payload);
        const algo = await EventModel.create(payload);
        console.log(algo);
        return algo;
    }
}
