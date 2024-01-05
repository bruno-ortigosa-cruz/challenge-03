import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IDeletedEvents,
    IEventQuery,
    IEventWithId,
    IReturnEventWithId,
    TypeDayOfWeek,
} from '../../../../helpers/interfaces/event.interface';

export class DeleteManyEventsUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(query: TypeDayOfWeek): Promise<IDeletedEvents> {
        const eventsToBeDeleted: IReturnEventWithId[] = await this.getQuery({
            dayOfWeek: query,
        });

        await this.model.deleteMany({ dayOfWeek: query });

        const deleteResponse: IDeletedEvents = {
            deletedEvents: eventsToBeDeleted,
        };

        return deleteResponse;
    }

    private async getQuery(query: IEventQuery): Promise<IReturnEventWithId[]> {
        return await this.model.find(query);
    }
}
