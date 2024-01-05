import { NotFoundError } from '../../../helpers/errors';
import { IReturnEventWithId } from '../../../helpers/interfaces/event.interface';
import { GetEventByIdUseCaseRep } from '../../../infra/repositories/use-cases/event/get-by-id.event';
import { GetEventByIdUseCaseSer } from './get-by-id.event';

const mockEvent = {
    _id: 'Mocked Id',
    description: 'Mocked Description 1',
    dayOfWeek: 'friday',
    userId: 'Mocked UserId',
} as IReturnEventWithId;

describe('GetEventByIdUseCaseSer', () => {
    it('should return the correct user', async () => {
        jest.spyOn(GetEventByIdUseCaseRep.prototype, 'exec').mockResolvedValue(
            mockEvent,
        );

        const service = new GetEventByIdUseCaseSer();
        const response = await service.exec(mockEvent._id);

        expect(response).toEqual(mockEvent);
    });

    it('should throw an error if no event is found', async () => {
        jest.spyOn(GetEventByIdUseCaseRep.prototype, 'exec').mockResolvedValue(
            null,
        );

        const service = new GetEventByIdUseCaseSer();

        await expect(service.exec('not-registered-id')).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });
});
