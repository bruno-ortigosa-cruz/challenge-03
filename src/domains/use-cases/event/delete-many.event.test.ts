import { NotFoundError } from '../../../helpers/errors';
import { IDeletedEvents } from '../../../helpers/interfaces/event.interface';
import { DeleteManyEventsUseCaseRep } from '../../../infra/repositories/use-cases/event/delete-many.event';
import { DeleteManyEventsUseCaseSer } from './delete-many.event';

const mockedEvents = {
    deletedEvents: [
        {
            _id: 'Mocked Id',
            description: 'Mocked Description 1',
            dayOfWeek: 'friday',
            userId: 'Mocked UserId',
        },
        {
            _id: 'Mocked Id',
            description: 'Mocked Description 2',
            dayOfWeek: 'saturday',
            userId: 'Mocked UserId',
        },
        {
            _id: 'Mocked Id',
            description: 'Mocked Description 3',
            dayOfWeek: 'monday',
            userId: 'Mocked UserId',
        },
        {
            _id: 'Mocked Id',
            description: 'Mocked Description 4',
            dayOfWeek: 'friday',
            userId: 'Mocked UserId',
        },
    ],
} as IDeletedEvents;

const mockedInputEvents = {
    deletedEvents: [
        mockedEvents.deletedEvents[0],
        mockedEvents.deletedEvents[3],
    ],
} as IDeletedEvents;

describe('DeleteManyEventsUseCaseRep', () => {
    it('should return the event list after successful deletion', async () => {
        jest.spyOn(
            DeleteManyEventsUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue(mockedInputEvents);

        const service = new DeleteManyEventsUseCaseSer();
        const response = await service.exec('friday');

        expect(response).toEqual(mockedInputEvents);
    });

    it('should throw an error when no events are found', async () => {
        jest.spyOn(
            DeleteManyEventsUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue({ deletedEvents: [] });

        const service = new DeleteManyEventsUseCaseSer();

        await expect(service.exec('wednesday')).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });
});
