import { NotFoundError } from '../../../helpers/errors';
import { DeleteEventByIdUseCaseRep } from '../../../infra/repositories/use-cases/event/delete-by-id.event';
import { DeleteEventByIdUseCaseSer } from './delete-by-id.event';

describe('DeleteEventByIdUseCaseSer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should delete the event and return nothing', async () => {
        const spy = jest
            .spyOn(DeleteEventByIdUseCaseRep.prototype, 'exec')
            .mockResolvedValue({ acknowledged: true, deletedCount: 1 });

        const service = new DeleteEventByIdUseCaseSer();
        await service.exec('Mocked Id');

        expect(spy).toHaveBeenCalledWith('Mocked Id');
    });

    it('should throw an error when no events are found', async () => {
        jest.spyOn(
            DeleteEventByIdUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue({ acknowledged: true, deletedCount: 0 });

        const service = new DeleteEventByIdUseCaseSer();

        await expect(service.exec('not-registered-id')).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });
});
