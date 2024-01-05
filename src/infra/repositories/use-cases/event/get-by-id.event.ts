import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IEventWithId,
    IReturnEventWithId,
} from '../../../../helpers/interfaces/event.interface';

export class GetEventByIdUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(id: string): Promise<IReturnEventWithId | null> {
        return await this.model.findById(id);
    }
}
