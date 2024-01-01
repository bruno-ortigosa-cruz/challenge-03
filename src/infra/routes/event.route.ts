import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { ValidationMiddleware } from '../../helpers/middlewares/validation.middleware';
import { createEventSchema } from '../../helpers/validations/event.validation';
import { IRoute } from '../../helpers/interfaces/route.interface';
import {
    deleteEventQuery,
    getEventQuery,
} from '../../helpers/validations/query.validation';

export class EventRoutes implements IRoute {
    public readonly router: Router = Router();
    private controller: EventController;
    private validation: ValidationMiddleware;
    private readonly generalRoute = '/events';
    private readonly idRoute = '/events/:id';

    constructor() {
        this.controller = new EventController();
        this.validation = new ValidationMiddleware();
        this.setRoute();
    }

    private setRoute(): void {
        this.router.get(
            this.generalRoute,
            this.validation.exec(getEventQuery, true),
            this.controller.get,
        );
        this.router.get(this.idRoute, this.controller.get);
        this.router.post(
            this.generalRoute,
            this.validation.exec(createEventSchema),
            this.controller.create,
        );
        this.router.delete(
            this.generalRoute,
            this.validation.exec(deleteEventQuery, true),
            this.controller.remove,
        );
        this.router.delete(this.idRoute, this.controller.remove);
    }
}
