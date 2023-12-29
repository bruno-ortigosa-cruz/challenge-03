import { Model } from 'mongoose';
import {
    IDeleteResponse,
    IDeletedEvents,
    IEvent,
    IEventQuery,
    IReturnEvent,
} from '../../helpers/interfaces/event.interface';
import { EventModel } from '../database/models/event.model';

export class EventRepository {
    private model: Model<IEvent>;

    constructor() {
        this.model = EventModel;
    }

    public async getAll(): Promise<IReturnEvent[]> {
        return await this.model.find({});
    }

    public async getById(id: string): Promise<IReturnEvent | null> {
        return await this.model.findById(id);
    }

    public async getQuery(query: IEventQuery): Promise<IReturnEvent[]> {
        return await this.model.find(query);
    }

    public async create(payload: IEvent): Promise<IReturnEvent> {
        return await this.model.create(payload);
    }

    public async removeByDay(query: IEventQuery): Promise<IDeletedEvents> {
        const eventsToBeDeleted: IReturnEvent[] = await this.getQuery(query);

        await this.model.deleteMany({ dayOfWeek: query });

        const deleteResponse: IDeletedEvents = {
            deletedEvents: eventsToBeDeleted,
        };

        return deleteResponse;
    }

    public async removeById(id: string): Promise<IDeleteResponse> {
        const deleteResult = await this.model.deleteOne({ _id: id });
        return deleteResult;
    }
}
