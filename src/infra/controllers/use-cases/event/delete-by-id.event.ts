import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TypeDayOfWeek } from '../../../../helpers/interfaces/event.interface';
import { DeleteEventByIdUseCaseSer } from '../../../../domains/use-cases/event/delete-by-id.event';

export class DeleteEventByIdUseCaseCon {
    private service: DeleteEventByIdUseCaseSer;

    constructor() {
        this.service = new DeleteEventByIdUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const dayOfWeek = req.query.dayOfWeek as TypeDayOfWeek;
        await this.service.exec(dayOfWeek);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
