import 'express-async-errors';
import express from 'express';
import { EventRoutes } from './infra/routes/event.route';
import { UserRoutes } from './infra/routes/user.route';
import { EndpointNotFound } from './helpers/middlewares/not-found.middleware';
import { AuthMiddleware } from './helpers/middlewares/auth.middleware';
import { ErrorHandlerMiddleware } from './helpers/middlewares/error-handler.middleware';
import { ErrorTriggerMiddleware } from './helpers/middlewares/error-trigger.middleware';

export class App {
    public readonly app = express();
    private eventRoute: EventRoutes;
    private userRoute: UserRoutes;
    private authentication: AuthMiddleware;
    private errorTrigger: ErrorTriggerMiddleware;
    private errorHandler: ErrorHandlerMiddleware;
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.userRoute = new UserRoutes();
        this.eventRoute = new EventRoutes();
        this.authentication = new AuthMiddleware();
        this.errorTrigger = new ErrorTriggerMiddleware();
        this.errorHandler = new ErrorHandlerMiddleware();

        this.app.use(express.json());

        this.app.use(this.prefix, this.userRoute.router);
        this.app.use(
            this.prefix,
            this.authentication.exec,
            this.eventRoute.router,
        );

        this.app.use(this.errorTrigger.exec);
        this.app.use(this.errorHandler.exec);
        this.app.use(new EndpointNotFound().fallback);
    }
}
