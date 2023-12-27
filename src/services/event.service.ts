import { IEvent } from '../interfaces/event.interface';
import { EventRepository } from '../repositories/event.repository';

export class EventService {
    private eventRepository = new EventRepository();

    constructor() {}

    public async getEvents(weekdayQuery: string): Promise<IEvent[]> {
        if (!weekdayQuery) {
            return await this.eventRepository.getAllEvents();
        } else return [];
    }

    public async createEvent(payload: IEvent) {
        return await this.eventRepository.createEvent(payload);
    }
}
