import { Model } from 'mongoose';
import { EventModel } from '../../../database/models/event.model';
import {
    IDeleteResponse,
    IEventWithId,
} from '../../../../helpers/interfaces/event.interface';

export class DeleteEventByIdUseCaseRep {
    private model: Model<IEventWithId>;

    constructor() {
        this.model = EventModel;
    }

    public async exec(id: string): Promise<IDeleteResponse> {
        const deleteResult = await this.model.deleteOne({ _id: id });
        return deleteResult;
    }
}
