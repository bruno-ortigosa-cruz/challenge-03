import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {
    public readonly router: Router = Router();
    private controller: UserController;
    private readonly generalRoute = '/users';
    private readonly signUpRoute = `${this.generalRoute}/sign-up`;
    private readonly signInRoute = `${this.generalRoute}/sign-in`;

    constructor() {
        this.controller = new UserController();
        this.setRoute();
    }

    private setRoute(): void {
        this.router.post(this.signUpRoute, this.controller.signUp);
        this.router.post(this.signInRoute, this.controller.signIn);
    }
}
