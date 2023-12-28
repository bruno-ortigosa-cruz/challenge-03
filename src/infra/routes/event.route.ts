import { Router } from 'express';
import { EventController } from '../controllers/event.controller';

export class EventRoutes {
    public readonly router: Router = Router();
    private controller: EventController;
    private readonly generalRoute = '/events';
    private readonly idRoute = '/events/:id';

    constructor() {
        this.controller = new EventController();
        this.setRoute();
    }

    private setRoute() {
        this.router.get(this.generalRoute, this.controller.getByDay);
        this.router.get(this.idRoute, this.controller.getById);
        this.router.post(this.generalRoute, this.controller.create);
        this.router.delete(this.generalRoute, this.controller.remove);
    }
}
