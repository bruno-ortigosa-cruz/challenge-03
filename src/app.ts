import 'express-async-errors';
import express from 'express';
import { EventRoutes } from './routes/event.route';

export class App {
    public readonly app = express();
    private eventRoute;
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.eventRoute = new EventRoutes();

        this.app.use(express.json());

        this.app.use(this.prefix, this.eventRoute.router);
    }
}
