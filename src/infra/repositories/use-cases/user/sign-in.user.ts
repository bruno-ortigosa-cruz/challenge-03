import { Model } from 'mongoose';
import {
    IUser,
    IUserSignInRequest,
} from '../../../../helpers/interfaces/user.interface';
import { UserModel } from '../../../database/models/user.model';

export class SignInUseCaseRep {
    private model: Model<IUser>;

    constructor() {
        this.model = UserModel;
    }

    public async exec(user: IUserSignInRequest): Promise<IUser | null> {
        return await this.model.findOne({ email: user.email });
    }
}
