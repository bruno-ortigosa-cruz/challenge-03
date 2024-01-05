import { Router } from 'express';
import { ValidationMiddleware } from '../../helpers/middlewares/validation.middleware';
import {
    userSignInSchema,
    userSignUpSchema,
} from '../../helpers/validations/user.validation';
import { IRoute } from '../../helpers/interfaces/route.interface';
import { SignUpUseCaseCon } from '../controllers/use-cases/user/sign-up.user';
import { SignInUseCaseCon } from '../controllers/use-cases/user/sign-in.user';

export class UserRoutes implements IRoute {
    public readonly router: Router = Router();
    private signUpController: SignUpUseCaseCon;
    private signInController: SignInUseCaseCon;
    private validation: ValidationMiddleware;
    private readonly generalRoute = '/users';
    private readonly signUpRoute = `${this.generalRoute}/sign-up`;
    private readonly signInRoute = `${this.generalRoute}/sign-in`;

    constructor() {
        this.signUpController = new SignUpUseCaseCon();
        this.signInController = new SignInUseCaseCon();
        this.validation = new ValidationMiddleware();
        this.setRoute();
    }

    private setRoute(): void {
        this.router.post(
            this.signUpRoute,
            this.validation.exec(userSignUpSchema),
            this.signUpController.exec,
        );
        this.router.post(
            this.signInRoute,
            this.validation.exec(userSignInSchema),
            this.signInController.exec,
        );
    }
}
