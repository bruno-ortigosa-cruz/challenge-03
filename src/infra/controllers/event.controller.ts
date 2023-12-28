import { Request, Response } from 'express';
import { EventService } from '../../domains/services/event.service';
import { StatusCodes } from 'http-status-codes';

export class EventController {
    private service: EventService;

    constructor() {
        this.service = new EventService();
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
    }

    public async get(req: Request, res: Response) {
        const events = await this.service.get(req);
        res.status(StatusCodes.OK).json(events);
    }

    public async create(req: Request, res: Response) {
        const event = await this.service.createEvent(req.body);
        res.status(StatusCodes.CREATED).json(event);
    }

    public async remove(req: Request, res: Response) {
        const events = await this.service.remove(req);

        if (events) res.send(StatusCodes.OK).json(events);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
