import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IDeletedEvents,
    IEventQuery,
    IEventWithId,
    IReturnEvent,
    TypeDayOfWeek,
} from '../../../../helpers/interfaces/event.interface';

export class DeleteEventsByDayUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(query: TypeDayOfWeek): Promise<IDeletedEvents> {
        const eventsToBeDeleted: IReturnEvent[] = await this.getQuery({
            dayOfWeek: query,
        });

        await this.model.deleteMany({ dayOfWeek: query });

        const deleteResponse: IDeletedEvents = {
            deletedEvents: eventsToBeDeleted,
        };

        return deleteResponse;
    }

    private async getQuery(query: IEventQuery): Promise<IReturnEvent[]> {
        return await this.model.find(query);
    }
}
