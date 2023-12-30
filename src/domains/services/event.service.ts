import { Request } from 'express';
import {
    IEvent,
    IEventQuery,
    IReturnEvent,
    TypeDayOfWeek,
} from '../../helpers/interfaces/event.interface';
import { EventRepository } from '../../infra/repositories/event.repository';
import { BadRequestError, NotFoundError } from '../../helpers/errors';

export class EventService {
    private repository: EventRepository;

    constructor() {
        this.repository = new EventRepository();
    }

    public async get(req: Request): Promise<IReturnEvent[] | IReturnEvent> {
        const id = req.params.id as string;
        const dayOfWeekQuery = req.query.dayOfWeek as TypeDayOfWeek;
        const descriptionQuery = req.query.description as string;

        if (id) return this.getById(id);
        if (!(dayOfWeekQuery || descriptionQuery)) {
            return await this.repository.getAll();
        }

        const query = await this.buildQuery(dayOfWeekQuery, descriptionQuery);
        return await this.repository.getQuery(query);
    }

    private async getById(id: string) {
        const event = await this.repository.getById(id);

        if (!event) {
            throw new NotFoundError('Event not found');
        }
        return event;
    }

    private async buildQuery(
        dayOfWeekQuery: TypeDayOfWeek,
        descriptionQuery: string,
    ) {
        const query: IEventQuery = {};

        if (dayOfWeekQuery) query['dayOfWeek'] = dayOfWeekQuery;
        if (descriptionQuery) {
            const regex = new RegExp(`.*${descriptionQuery}.*`, 'i');
            query['description'] = { $regex: regex };
        }

        return query;
    }

    public async createEvent(payload: IEvent) {
        return await this.repository.create(payload);
    }

    public async remove(req: Request) {
        const id = req.params.id;
        const dayOfWeekQuery: IEventQuery = req.query.dayOfWeek as IEventQuery;

        if (id) {
            const deletedEvent = await this.repository.removeById(id);
            if (deletedEvent.deletedCount === 0) {
                throw new NotFoundError('Event not found');
            }

            return null;
        }

        if (!dayOfWeekQuery) {
            throw new BadRequestError('Day of the week not provided');
        }

        return await this.repository.removeByDay(dayOfWeekQuery);
    }
}
