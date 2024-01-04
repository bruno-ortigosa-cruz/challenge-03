import { NotFoundError } from '../../../helpers/errors';
import { TypeDayOfWeek } from '../../../helpers/interfaces/event.interface';
import { DeleteEventsByDayUseCaseRep } from '../../../infra/repositories/use-cases/event/delete-many.event';

export class DeleteManyEventsUseCaseSer {
    private repository: DeleteEventsByDayUseCaseRep;

    constructor() {
        this.repository = new DeleteEventsByDayUseCaseRep();
    }

    public async exec(dayOfWeek: TypeDayOfWeek) {
        const events = await this.repository.exec(dayOfWeek);

        if (events.deletedEvents.length === 0)
            throw new NotFoundError('No events found');

        return events;
    }
}
