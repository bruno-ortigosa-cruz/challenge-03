import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IEventQuery,
    IEventWithId,
    IReturnEventWithId,
} from '../../../../helpers/interfaces/event.interface';

export class GetEventsByDayUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(query: IEventQuery): Promise<IReturnEventWithId[]> {
        return await this.model.find(query);
    }
}
