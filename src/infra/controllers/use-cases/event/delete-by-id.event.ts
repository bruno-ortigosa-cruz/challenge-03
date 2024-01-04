import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DeleteEventByIdUseCaseSer } from '../../../../domains/use-cases/event/delete-by-id.event';

export class DeleteEventByIdUseCaseCon {
    private service: DeleteEventByIdUseCaseSer;

    constructor() {
        this.service = new DeleteEventByIdUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const id = req.params.id;

        await this.service.exec(id);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
