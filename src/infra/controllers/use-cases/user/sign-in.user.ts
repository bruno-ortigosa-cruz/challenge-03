import {
    ISignInReturn,
    IUserSignInRequest,
} from '../../../../helpers/interfaces/user.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SignInUseCaseSer } from '../../../../domains/use-cases/user/sign-in.user';

export class SignInUseCaseCon {
    private service: SignInUseCaseSer;

    constructor() {
        this.service = new SignInUseCaseSer();
        this.exec = this.exec.bind(this);
    }

    public async exec(req: Request, res: Response) {
        const payload = req.body as IUserSignInRequest;

        const response: ISignInReturn = await this.service.exec(payload);

        res.header('Authorization', 'Bearer ' + response.token);
        res.status(StatusCodes.OK).json(response.user);
    }
}
