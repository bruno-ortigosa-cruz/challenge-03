import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DeleteManyEventsUseCaseSer } from '../../../../domains/use-cases/event/delete-many.event';
import { TypeDayOfWeek } from '../../../../helpers/interfaces/event.interface';

export class DeleteManyEventsUseCaseCon {
    private service: DeleteManyEventsUseCaseSer;

    constructor() {
        this.service = new DeleteManyEventsUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const dayOfWeek = req.query.dayOfWeek as TypeDayOfWeek;
        const events = await this.service.exec(dayOfWeek);

        res.status(StatusCodes.OK).json(events);
    }
}
