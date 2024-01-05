import { IEvent } from '../../../../helpers/interfaces/event.interface';
import { EventModel } from '../../../database/models/event.model';
import { GetAllEventsUseCaseRep } from './get-all.event';

describe('GetAllEventsUseCaseRep', () => {
    it('should return an array of events', async () => {
        const mockEvents = [
            {
                description: 'Mocked Description 1',
                dayOfWeek: 'friday',
            },
            {
                description: 'Mocked Description 2',
                dayOfWeek: 'sunday',
            },
        ] as IEvent[];
        jest.spyOn(EventModel, 'find').mockResolvedValue(mockEvents);

        const useCase = new GetAllEventsUseCaseRep();
        const result = await useCase.exec();

        expect(result).toEqual(mockEvents);
    });

    it('should return an empty array when no events exist', async () => {
        jest.spyOn(EventModel, 'find').mockResolvedValue([]);

        const useCase = new GetAllEventsUseCaseRep();
        const result = await useCase.exec();

        expect(result).toEqual([]);
    });
});
