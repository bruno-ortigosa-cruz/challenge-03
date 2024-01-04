import { TypeDayOfWeek } from '../../../../helpers/interfaces/event.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetManyEventsUseCaseSer } from '../../../../domains/use-cases/event/get-many.event';

export class GetManyEventsUseCaseCon {
    private service: GetManyEventsUseCaseSer;

    constructor() {
        this.service = new GetManyEventsUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const dow = req.query.dayOfWeek as TypeDayOfWeek;
        const desc = req.query.description as string;

        const events = await this.service.exec(dow, desc);
        res.status(StatusCodes.OK).json(events);
    }
}
