import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { ValidationMiddleware } from '../../helpers/middlewares/validation.middleware';
import {
    userSignInSchema,
    userSignUpSchema,
} from '../../helpers/validations/user.validation';
import { IRoute } from '../../helpers/interfaces/route.interface';

export class UserRoutes implements IRoute {
    public readonly router: Router = Router();
    private controller: UserController;
    private validation: ValidationMiddleware;
    private readonly generalRoute = '/users';
    private readonly signUpRoute = `${this.generalRoute}/sign-up`;
    private readonly signInRoute = `${this.generalRoute}/sign-in`;

    constructor() {
        this.controller = new UserController();
        this.validation = new ValidationMiddleware();
        this.setRoute();
    }

    private setRoute(): void {
        this.router.post(
            this.signUpRoute,
            this.validation.exec(userSignUpSchema),
            this.controller.signUp,
        );
        this.router.post(
            this.signInRoute,
            this.validation.exec(userSignInSchema),
            this.controller.signIn,
        );
    }
}
