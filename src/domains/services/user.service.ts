import { Request } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';
import { IUserNoPassword } from '../../helpers/interfaces/user.interface';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async signUp(req: Request): Promise<IUserNoPassword> {
        const payload = req.body;
        const user = (await this.repository.signUp(payload)).toJSON();
        delete user.password;
        return user as IUserNoPassword;
    }
}
