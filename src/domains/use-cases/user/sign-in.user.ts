import {
    ISignInReturn,
    IUser,
    IUserSignInRequest,
    IUserSignInResponse,
} from '../../../helpers/interfaces/user.interface';
import { BadRequestError } from '../../../helpers/errors';
import { compare } from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { SignInUseCaseRep } from '../../../infra/repositories/use-cases/user/sign-in.user';

export class SignInUseCaseSer {
    private repository: SignInUseCaseRep;

    constructor() {
        this.repository = new SignInUseCaseRep();
    }

    public async exec(payload: IUserSignInRequest): Promise<ISignInReturn> {
        const user: IUser | null = await this.repository.exec(payload);

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
