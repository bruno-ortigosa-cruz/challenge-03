import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetEventByIdUseCaseSer } from '../../../../domains/use-cases/event/get-by-id.event';

export class GetEventByIdUseCaseCon {
    private service: GetEventByIdUseCaseSer;

    constructor() {
        this.service = new GetEventByIdUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const id = req.params.id;

        const events = await this.service.exec(id);
        res.status(StatusCodes.OK).json(events);
    }
}
