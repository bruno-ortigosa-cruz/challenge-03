import { Model } from 'mongoose';
import { IUser, IUserResponse } from '../../helpers/interfaces/user.interface';
import { UserModel } from '../database/models/user.model';

export class UserRepository {
    private model: Model<IUser>;

    constructor() {
        this.model = UserModel;
    }

    public async signUp(payload: IUser): Promise<IUserResponse> {
        return await this.model.create(payload);
    }

    public async signIn() {}
}
