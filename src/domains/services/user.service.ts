import { Request } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import {
    IUser,
    IUserNoPassword,
    IUserSignInRequest,
    IUserSignInResponse,
} from '../../helpers/interfaces/user.interface';
import { compare } from 'bcrypt';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async signUp(req: Request): Promise<IUserNoPassword> {
        const payload: IUser = req.body;
        const user = (await this.repository.signUp(payload)).toJSON();
        delete user.password;
        return user as IUserNoPassword;
    }

    public async signIn(req: Request): Promise<IUserSignInResponse> {
        const payload: IUserSignInRequest = req.body;
        const user: IUser | null = await this.repository.signIn(payload);

        if (!user) throw new Error('tem esse user não, meu jovem');

        const isPasswordCorrect = await compare(
            payload.password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new Error('ta mexendo onde não deve pitbull');
        }

        const responseUser: IUserSignInResponse = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        return responseUser;
    }
}
