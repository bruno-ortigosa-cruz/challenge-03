import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { StatusCodes } from 'http-status-codes';

export class EventController {
    private service: EventService;

    constructor() {
        this.service = new EventService();
        this.getEvents = this.getEvents.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    public async getEvents(req: Request, res: Response) {
        const events = await this.service.getEvents(
            req.query.daysofweek as string,
        );
        res.status(StatusCodes.OK).json(events);
    }

    public async createEvent(req: Request, res: Response) {
        const event = await this.service.createEvent(req.body);
        res.status(StatusCodes.CREATED).json(event);
    }
}
