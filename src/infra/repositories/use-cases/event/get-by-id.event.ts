import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IEventWithId,
    IReturnEvent,
} from '../../../../helpers/interfaces/event.interface';

export class GetEventsByIdUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(id: string): Promise<IReturnEvent | null> {
        return await this.model.findById(id);
    }
}
