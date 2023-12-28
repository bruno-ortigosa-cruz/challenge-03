import 'express-async-errors';
import express from 'express';
import { EventRoutes } from './infra/routes/event.route';
import { UserRoutes } from './infra/routes/user.route';
import { EndpointNotFound } from './helpers/middlewares/not-found.middleware';

export class App {
    public readonly app = express();
    private eventRoute: EventRoutes;
    private userRoute: UserRoutes;
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.eventRoute = new EventRoutes();
        this.userRoute = new UserRoutes();

        this.app.use(express.json());

        this.app.use(this.prefix, this.eventRoute.router);
        this.app.use(this.prefix, this.userRoute.router);

        this.app.use(new EndpointNotFound().fallback);
    }
}
