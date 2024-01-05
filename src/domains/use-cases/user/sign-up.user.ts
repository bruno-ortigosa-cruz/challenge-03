import {
    IUserNoPassword,
    IUserRequest,
} from '../../../helpers/interfaces/user.interface';
import { SignUpUseCaseRep } from '../../../infra/repositories/use-cases/user/sign-up.user';

export class SignUpUseCaseSer {
    private repository: SignUpUseCaseRep;

    constructor() {
        this.repository = new SignUpUseCaseRep();
    }

    public async exec(payload: IUserRequest): Promise<IUserNoPassword> {
        const user = (await this.repository.exec(payload)).toJSON();

        delete user.password;

        return user as IUserNoPassword;
    }
}
