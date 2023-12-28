import {
    IEvent,
    TypeDayOfWeek,
} from '../../helpers/interfaces/event.interface';
import { EventRepository } from '../../infra/repositories/event.repository';

export class EventService {
    private eventRepository = new EventRepository();

    constructor() {}

    public async get(weekdayQuery: TypeDayOfWeek): Promise<IEvent[]> {
        if (!weekdayQuery) {
            return await this.eventRepository.getAll();
        } else {
            return await this.eventRepository.getQuery(weekdayQuery);
        }
    }

    public async createEvent(payload: IEvent) {
        return await this.eventRepository.create(payload);
    }

    public async remove(weekdayQuery: TypeDayOfWeek) {
        return await this.eventRepository.remove(weekdayQuery);
    }
}
