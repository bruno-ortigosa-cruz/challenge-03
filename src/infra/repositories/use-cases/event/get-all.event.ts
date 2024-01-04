import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IEventWithId,
    IReturnEvent,
} from '../../../../helpers/interfaces/event.interface';

export class GetAllEventsUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(): Promise<IReturnEvent[]> {
        return await this.model.find({});
    }
}
