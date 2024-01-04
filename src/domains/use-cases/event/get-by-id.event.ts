import { NotFoundError } from '../../../helpers/errors';
import { IReturnEvent } from '../../../helpers/interfaces/event.interface';
import { GetEventsByIdUseCaseRep } from '../../../infra/repositories/use-cases/event/get-by-id.event';

export class GetEventByIdUseCaseSer {
    private repository: GetEventsByIdUseCaseRep;

    constructor() {
        this.repository = new GetEventsByIdUseCaseRep();
    }

    public async exec(id: string): Promise<IReturnEvent> {
        const event = await this.repository.exec(id);

        if (!event) {
            throw new NotFoundError('Event not found');
        }

        return event;
    }
}
