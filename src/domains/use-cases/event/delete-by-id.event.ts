import { NotFoundError } from '../../../helpers/errors';
import { DeleteEventByIdUseCaseRep } from '../../../infra/repositories/use-cases/event/delete-by-id.event';

export class DeleteEventByIdUseCaseSer {
    private repository: DeleteEventByIdUseCaseRep;

    constructor() {
        this.repository = new DeleteEventByIdUseCaseRep();
    }

    public async exec(id: string) {
        const event = await this.repository.removeById(id);

        if (event.deletedCount === 0)
            throw new NotFoundError('Event not found');
    }
}
