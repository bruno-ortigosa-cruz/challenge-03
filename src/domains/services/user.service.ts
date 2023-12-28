import { Request } from 'express';
import { UserRepository } from '../../infra/repositories/user.repository';

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async signUp(req: Request) {
        const payload = req.body;
        const user = await this.repository.signUp(payload);
        user.password = '***********';
        return user;
    }
}
