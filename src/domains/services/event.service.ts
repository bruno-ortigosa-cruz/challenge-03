import { Request } from 'express';
import {
    IEvent,
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
        const id: string = req.params.id;
        const weekdayQuery: TypeDayOfWeek = req.query
            .dayOfWeek as TypeDayOfWeek;

        if (id) {
            const event = await this.repository.getById(id);

            if (!event) {
                throw new Error('Não achou o evento não meu consagrado');
            }
            return event;
        }

        if (!weekdayQuery) return await this.repository.getAll();

        return await this.repository.getQuery(weekdayQuery);
    }

    public async createEvent(payload: IEvent) {
        return await this.repository.create(payload);
    }

    public async remove(req: Request) {
        const id = req.params.id;
        const weekdayQuery: TypeDayOfWeek = req.query
            .dayOfWeek as TypeDayOfWeek;

        if (id) {
            const deletedEvent = await this.repository.removeById(id);
            if (!deletedEvent) {
                throw new Error('Não achou o evento não meu consagrado');
            }

            return null;
        }

        if (!weekdayQuery) throw new Error('sem query meu patrão');

        return await this.repository.removeByDay(weekdayQuery);
    }
}
