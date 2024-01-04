import { Router } from 'express';
import { ValidationMiddleware } from '../../helpers/middlewares/validation.middleware';
import { createEventSchema } from '../../helpers/validations/event.validation';
import { IRoute } from '../../helpers/interfaces/route.interface';
import {
    deleteEventQuery,
    getEventQuery,
} from '../../helpers/validations/query.validation';
import { AuthMiddleware } from '../../helpers/middlewares/auth.middleware';
import { GetManyEventsUseCaseCon } from '../controllers/use-cases/event/get-many.event';
import { GetEventByIdUseCaseCon } from '../controllers/use-cases/event/get-by-id.event';
import { CreateEventUseCaseCon } from '../controllers/use-cases/event/create.event';
import { DeleteManyEventsUseCaseCon } from '../controllers/use-cases/event/delete-many.event';
import { DeleteEventByIdUseCaseCon } from '../controllers/use-cases/event/delete-by-id.event';

export class EventRoutes implements IRoute {
    public readonly router: Router = Router();
    private getController: GetManyEventsUseCaseCon;
    private getByIdController: GetEventByIdUseCaseCon;
    private createController: CreateEventUseCaseCon;
    private deleteController: DeleteManyEventsUseCaseCon;
    private deleteByIdController: DeleteEventByIdUseCaseCon;
    private validation: ValidationMiddleware;
    private authentication: AuthMiddleware;
    private readonly generalRoute = '/events';
    private readonly idRoute = '/events/:id';

    constructor() {
        this.getController = new GetManyEventsUseCaseCon();
        this.getByIdController = new GetEventByIdUseCaseCon();
        this.createController = new CreateEventUseCaseCon();
        this.deleteController = new DeleteManyEventsUseCaseCon();
        this.deleteByIdController = new DeleteEventByIdUseCaseCon();
        this.validation = new ValidationMiddleware();
        this.authentication = new AuthMiddleware();

        this.setRoute();
    }

    private setRoute(): void {
        this.router.get(
            this.generalRoute,
            this.validation.exec(getEventQuery, true),
            this.authentication.exec,
            this.getController.exec,
        );
        this.router.get(
            this.idRoute,
            this.authentication.exec,
            this.getByIdController.exec,
        );
        this.router.post(
            this.generalRoute,
            this.validation.exec(createEventSchema),
            this.authentication.exec,
            this.createController.exec,
        );
        this.router.delete(
            this.generalRoute,
            this.validation.exec(deleteEventQuery, true),
            this.authentication.exec,
            this.deleteController.exec,
        );
        this.router.delete(
            this.idRoute,
            this.authentication.exec,
            this.deleteByIdController.exec,
        );
    }
}
