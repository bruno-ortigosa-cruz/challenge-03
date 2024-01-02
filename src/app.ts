import 'express-async-errors';
import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './openapi.json';
import { EventRoutes } from './infra/routes/event.route';
import { UserRoutes } from './infra/routes/user.route';
import { FallbackMiddleware } from './helpers/middlewares/fallback.middleware';
import { ErrorHandlerMiddleware } from './helpers/middlewares/error-handler.middleware';
import { IApp } from './helpers/interfaces/route.interface';

export class App implements IApp {
    public readonly app = express();
    public routes;
    private fallback: FallbackMiddleware;
    private errorHandler: ErrorHandlerMiddleware;
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
        this.routes = {
            user: new UserRoutes(),
            event: new EventRoutes(),
        };
        this.errorHandler = new ErrorHandlerMiddleware();
        this.fallback = new FallbackMiddleware();

        this.configureApp();
    }

    private configureApp() {
        this.app.use(express.json());

        const publicFolderPath = path.resolve(__dirname, '../public');
        this.app.use('/', express.static(publicFolderPath));

        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerConfig),
        );

        this.app.use(this.prefix, this.routes.user.router);
        this.app.use(this.prefix, this.routes.event.router);

        this.app.use(this.errorHandler.exec);
        this.app.use(this.fallback.exec);
    }
}
