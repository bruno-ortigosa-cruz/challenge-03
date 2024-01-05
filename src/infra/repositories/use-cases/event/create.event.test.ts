import { IEventWithId } from '../../../../helpers/interfaces/event.interface';
import { EventModel } from '../../../database/models/event.model';
import { CreateEventUseCaseRep } from './create.event';

jest.doMock('../../../database/models/event.model.ts', () => {
    const eventModelMock = {
        create: jest.fn(),
    };
    return {
        EventModel: eventModelMock,
    };
});

describe('CreateEventUseCaseRep', () => {
    it('should return a newly created event', async () => {
        const mockEvent = {
            description: 'jorge',
            dayOfWeek: 'thursday',
            userId: 'mocked id',
            _id: 'some id',
        };

        const mockCreate = jest.fn();
        EventModel.create = mockCreate;

        mockCreate.mockResolvedValue(mockEvent);

        const useCase = new CreateEventUseCaseRep();
        const result = await useCase.exec({
            description: 'jorge',
            dayOfWeek: 'thursday',
            userId: 'mocked id',
        } as IEventWithId);

        expect(result).toEqual(mockEvent);
    });
});
