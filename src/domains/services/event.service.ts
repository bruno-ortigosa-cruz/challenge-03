import { Request } from 'express';
import {
    IEvent,
    IReturnEvent,
    TypeDayOfWeek,
} from '../../helpers/interfaces/event.interface';
import { EventRepository } from '../../infra/repositories/event.repository';

export class EventService {
    private eventRepository = new EventRepository();

    constructor() {}

    public async get(req: Request): Promise<IReturnEvent[] | IReturnEvent> {
        const id: string = req.params.id;
        const weekdayQuery: TypeDayOfWeek = req.query
            .dayOfWeek as TypeDayOfWeek;

        if (id) {
            const event = await this.eventRepository.getById(id);

            if (!event) {
                throw new Error('Não achou o evento não meu consagrado');
            }
            return event;
        }

        if (!weekdayQuery) return await this.eventRepository.getAll();

        return await this.eventRepository.getQuery(weekdayQuery);
    }

    public async createEvent(payload: IEvent) {
        return await this.eventRepository.create(payload);
    }

    public async remove(req: Request) {
        const id = req.params.id;
        const weekdayQuery: TypeDayOfWeek = req.query
            .dayOfWeek as TypeDayOfWeek;

        if (id) {
            const deletedEvent = await this.eventRepository.removeById(id);
            if (!deletedEvent) {
                throw new Error('Não achou o evento não meu consagrado');
            }

            return null;
        }

        if (!weekdayQuery) throw new Error('sem query meu patrão');

        return await this.eventRepository.removeByDay(weekdayQuery);
    }
}
