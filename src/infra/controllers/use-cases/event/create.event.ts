import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateEventUseCaseSer } from '../../../../domains/use-cases/event/create.event';
import { RequestWithUser } from '../../../../helpers/middlewares/auth.middleware';

export class CreateEventUseCaseCon {
    private service: CreateEventUseCaseSer;

    constructor() {
        this.service = new CreateEventUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: RequestWithUser, res: Response) {
        const user = req.user;
        const body = req.body;
        const id = req.user!._id;
        const event = await this.service.exec(user, body, id);
        res.status(StatusCodes.CREATED).json(event);
    }
}
