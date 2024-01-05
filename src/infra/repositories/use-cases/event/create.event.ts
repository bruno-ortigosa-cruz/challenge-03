import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IEventWithId,
    IReturnEventWithId,
} from '../../../../helpers/interfaces/event.interface';

export class CreateEventUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(payload: IEventWithId): Promise<IReturnEventWithId> {
        return await this.model.create(payload);
    }
}
