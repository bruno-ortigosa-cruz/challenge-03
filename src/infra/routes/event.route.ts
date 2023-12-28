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

    private setRoute(): void {
        this.router.get(this.generalRoute, this.controller.get);
        this.router.get(this.idRoute, this.controller.get);
        this.router.post(this.generalRoute, this.controller.create);
        this.router.delete(this.generalRoute, this.controller.remove);
        this.router.delete(this.idRoute, this.controller.remove);
    }
}
