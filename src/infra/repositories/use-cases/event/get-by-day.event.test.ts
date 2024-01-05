import { IEvent } from '../../../../helpers/interfaces/event.interface';
import { EventModel } from '../../../database/models/event.model';
import { GetEventsByDayUseCaseRep } from './get-by-day.event';

describe('GetEventsByDayUseCaseRep', () => {
    it('should return an array of events when given a valid query', async () => {
        const mockEvents = [
            {
                description: 'Mocked Description 1',
                dayOfWeek: 'friday',
            },
            {
                description: 'Mocked Description 2',
                dayOfWeek: 'friday',
            },
        ] as IEvent[];
        jest.spyOn(EventModel, 'find').mockResolvedValue(mockEvents);

        const useCase = new GetEventsByDayUseCaseRep();
        const result = await useCase.exec({
            dayOfWeek: 'friday',
        });

        expect(result).toEqual(mockEvents);
    });

    it('should return an empty array when given an invalid query', async () => {
        jest.spyOn(EventModel, 'find').mockResolvedValue([]);

        const useCase = new GetEventsByDayUseCaseRep();
        const result = await useCase.exec({});

        expect(result).toEqual([]);
    });
});
