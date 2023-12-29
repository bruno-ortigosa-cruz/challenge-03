import { Request } from 'express';
import {
    IEvent,
    IEventQuery,
    IReturnEvent,
    TypeDayOfWeek,
} from '../../helpers/interfaces/event.interface';
import { EventRepository } from '../../infra/repositories/event.repository';

export class EventService {
    private repository: EventRepository;

    constructor() {
        this.repository = new EventRepository();
    }

    public async get(req: Request): Promise<IReturnEvent[] | IReturnEvent> {
        const id = req.params.id as string;
        const dayOfWeekQuery = req.query.dayOfWeek as TypeDayOfWeek;
        const descriptionQuery = req.query.description as string;

        if (id) this.getById(id);
        if (!(dayOfWeekQuery || descriptionQuery)) {
            return await this.repository.getAll();
        }

        const query = await this.buildQuery(dayOfWeekQuery, descriptionQuery);
        return await this.repository.getQuery(query);
    }

    private async getById(id: string) {
        const event = await this.repository.getById(id);

        if (!event) {
            throw new Error('Não achou o evento não meu consagrado');
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
            if (!deletedEvent) {
                throw new Error('Não achou o evento não meu consagrado');
            }

            return null;
        }

        if (!dayOfWeekQuery) throw new Error('sem query meu patrão');

        return await this.repository.removeByDay(dayOfWeekQuery);
    }
}
