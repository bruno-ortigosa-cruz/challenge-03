import { IReturnEventWithId } from '../../../../helpers/interfaces/event.interface';
import { EventModel } from '../../../database/models/event.model';
import { GetEventByIdUseCaseRep } from './get-by-id.event';

describe('GetEventByIdUseCaseRep', () => {
    it('should return an event when given a valid id', async () => {
        const mockEvent = {
            _id: 'Test Id',
            description: 'Test Description',
            dayOfWeek: 'friday',
            userId: 'Test User Id',
        } as IReturnEventWithId;
        jest.spyOn(EventModel, 'findById').mockResolvedValue(mockEvent);

        const useCase = new GetEventByIdUseCaseRep();
        const result = await useCase.exec('some-valid-id');

        expect(result).toEqual(mockEvent);
    });

    it('should return null when given an invalid id', async () => {
        jest.spyOn(EventModel, 'findById').mockResolvedValue(null);

        const useCase = new GetEventByIdUseCaseRep();
        const result = await useCase.exec('invalid-id');

        expect(result).toBeNull();
    });
});
