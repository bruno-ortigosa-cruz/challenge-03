import { UnauthorizedError } from '../../../helpers/errors';
import {
    IEvent,
    IEventWithId,
} from '../../../helpers/interfaces/event.interface';
import { TypeJwtResponse } from '../../../helpers/middlewares/auth.middleware';
import { CreateEventUseCaseRep } from '../../../infra/repositories/use-cases/event/create.event';

export class CreateEventUseCaseSer {
    private repository: CreateEventUseCaseRep;

    constructor() {
        this.repository = new CreateEventUseCaseRep();
    }

    public async exec(
        user: TypeJwtResponse | undefined,
        body: IEvent,
        id: string | undefined,
    ) {
        if (!user) throw new UnauthorizedError('User not logged in');
        const payload = { ...body, userId: id } as IEventWithId;

        return await this.repository.exec(payload);
    }
}
