import { Model } from 'mongoose';
import {
    IDeletedEvents,
    IEvent,
    IReturnEvent,
    TypeDayOfWeek,
} from '../interfaces/event.interface';
import { EventModel } from './models/event.model';

export class EventRepository {
    private model: Model<IEvent>;

    constructor() {
        this.model = EventModel;
    }

    public async getAll(): Promise<IEvent[]> {
        return await this.model.find({});
    }

    public async getQuery(query: TypeDayOfWeek): Promise<IReturnEvent[]> {
        return await this.model.find({ dayOfWeek: query });
    }

    public async create(payload: IEvent): Promise<IReturnEvent> {
        return await this.model.create(payload);
    }

    public async remove(query: TypeDayOfWeek): Promise<IDeletedEvents> {
        const eventsToBeDeleted: IReturnEvent[] = await this.getQuery(query);

        await this.model.deleteMany({ dayOfWeek: query });

        const deleteResponse: IDeletedEvents = {
            deletedEvents: eventsToBeDeleted,
        };

        return deleteResponse;
    }
}
