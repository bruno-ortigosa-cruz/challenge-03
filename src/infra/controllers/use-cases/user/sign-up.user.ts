import {
    IUserNoPassword,
    IUserRequest,
} from '../../../../helpers/interfaces/user.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SignUpUseCaseSer } from '../../../../domains/use-cases/user/sign-up.user';

export class SignUpUseCaseCon {
    private service: SignUpUseCaseSer;

    constructor() {
        this.service = new SignUpUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const payload = req.body as IUserRequest;

        const user: IUserNoPassword = await this.service.exec(payload);

        res.status(StatusCodes.CREATED).json(user);
    }
}
