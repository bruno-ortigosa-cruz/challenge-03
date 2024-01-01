import jwt, { Secret } from 'jsonwebtoken';
import { Request } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import {
    ISignInReturn,
    IUser,
    IUserNoPassword,
    IUserRequest,
    IUserSignInRequest,
    IUserSignInResponse,
} from '../../helpers/interfaces/user.interface';
import { compare } from 'bcrypt';
import { BadRequestError } from '../../helpers/errors';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async signUp(req: Request): Promise<IUserNoPassword> {
        const payload: IUserRequest = req.body;

        const user = (await this.repository.signUp(payload)).toJSON();

        delete user.password;

        return user as IUserNoPassword;
    }

    public async signIn(req: Request): Promise<ISignInReturn> {
        const payload: IUserSignInRequest = req.body;
        const user: IUser | null = await this.repository.signIn(payload);

        if (!user) {
            throw new BadRequestError('Email or password incorrect');
        }

        const isPasswordCorrect = await compare(
            payload.password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new BadRequestError('Email or password incorrect');
        }

        const responseUser: IUserSignInResponse = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        const token: string = this.signToken(user._id, user.email, '7d');

        return { user: responseUser, token };
    }

    private signToken(id: string, email: string, expiration: string): string {
        return jwt.sign(
            { _id: id, email: email },
            process.env.SECRET_KEY as Secret,
            {
                expiresIn: expiration,
            },
        );
    }
}
