import { NotFoundError } from '../../../helpers/errors';
import { IReturnEventWithId } from '../../../helpers/interfaces/event.interface';
import { GetEventByIdUseCaseRep } from '../../../infra/repositories/use-cases/event/get-by-id.event';

export class GetEventByIdUseCaseSer {
    private repository: GetEventByIdUseCaseRep;

    constructor() {
        this.repository = new GetEventByIdUseCaseRep();
    }

    public async exec(id: string): Promise<IReturnEventWithId> {
        const event = await this.repository.exec(id);

        if (!event) {
            throw new NotFoundError('Event not found');
        }

        return event;
    }
}
