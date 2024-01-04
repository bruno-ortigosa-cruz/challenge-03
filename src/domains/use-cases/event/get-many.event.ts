import { NotFoundError } from '../../../helpers/errors';
import {
    IEventQuery,
    TypeDayOfWeek,
} from '../../../helpers/interfaces/event.interface';
import { GetAllEventsUseCaseRep } from '../../../infra/repositories/use-cases/event/get-all.event';
import { GetEventsByDayUseCaseRep } from '../../../infra/repositories/use-cases/event/get-by-day.event';

export class GetEventsUseCaseSer {
    private getByDayRepository: GetEventsByDayUseCaseRep;
    private getAllRepository: GetAllEventsUseCaseRep;

    constructor() {
        this.getByDayRepository = new GetEventsByDayUseCaseRep();
        this.getAllRepository = new GetAllEventsUseCaseRep();
    }

    public async exec(dayOfWeek: TypeDayOfWeek, description: string) {
        if (!(dayOfWeek || description)) {
            return this.getAll();
        }

        const query = this.buildQuery(dayOfWeek, description);
        const events = await this.getByDayRepository.exec(query);

        if (!events || events.length === 0)
            throw new NotFoundError('No events found');

        return events;
    }

    private async getAll() {
        const events = await this.getAllRepository.exec();
        if (events.length === 0 || !events) {
            throw new NotFoundError('No events found');
        }
        return events;
    }

    private buildQuery(dayOfWeek: TypeDayOfWeek, description: string) {
        const query: IEventQuery = {};

        if (dayOfWeek) query['dayOfWeek'] = dayOfWeek;
        if (description) {
            const regex = new RegExp(`.*${description}.*`, 'i');
            query['description'] = { $regex: regex };
        }

        return query;
    }
}
