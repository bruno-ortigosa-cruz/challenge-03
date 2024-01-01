import { Request } from 'express';
import {
    IEventQuery,
    IReturnEvent,
    TypeDayOfWeek,
} from '../../helpers/interfaces/event.interface';
import { EventRepository } from '../../infra/repositories/event.repository';
import { NotFoundError, UnauthorizedError } from '../../helpers/errors';
import { RequestWithUser } from '../../helpers/middlewares/auth.middleware';

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
            const events = await this.repository.getAll();
            if (events.length === 0 || !events) {
                throw new NotFoundError('No events found');
            }
            return events;
        }

        const query = await this.buildQuery(dayOfWeekQuery, descriptionQuery);

        const events = await this.repository.getQuery(query);

        if (!events || events.length === 0)
            throw new NotFoundError('No events found');

        return events;
    }

    private async getById(id: string) {
        const event = await this.repository.getById(id);

        if (!event) {
            throw new NotFoundError('Event not found');
        }
        return event;
    }

    public async createEvent(req: RequestWithUser) {
        if (!req.user) throw new UnauthorizedError('User not logged in');
        const payload = { ...req.body, userId: req.user._id };
        return await this.repository.create(payload);
    }

    public async remove(req: Request) {
        const id = req.params.id;
        const dayOfWeekQuery: TypeDayOfWeek = req.query
            .dayOfWeek as TypeDayOfWeek;

        if (id) {
            const deletedEvent = await this.repository.removeById(id);
            if (deletedEvent.deletedCount === 0) {
                throw new NotFoundError('Event not found');
            }

            return null;
        }

        const events = await this.repository.removeByDay(dayOfWeekQuery);
        if (events.deletedEvents.length === 0)
            throw new NotFoundError('No events found');

        return events;
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
}
