import { Request, Response } from 'express';
import { UserService } from '../../domains/services/user.service';
import { StatusCodes } from 'http-status-codes';
import {
    IUserNoPassword,
    IUserSignInResponse,
} from '../../helpers/interfaces/user.interface';

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    public async signUp(req: Request, res: Response) {
        const user: IUserNoPassword = await this.service.signUp(req);
        res.status(StatusCodes.CREATED).json(user);
    }

    public async signIn(req: Request, res: Response) {
        const user: IUserSignInResponse = await this.service.signIn(req);
        res.status(StatusCodes.OK).json(user);
    }
}
