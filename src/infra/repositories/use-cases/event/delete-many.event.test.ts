import {
    IEvent,
    TypeDayOfWeek,
} from '../../../../helpers/interfaces/event.interface';
import { EventModel } from '../../../database/models/event.model';
import { DeleteManyEventsUseCaseRep } from './delete-many.event';

describe('DeleteManyEventsUseCaseRep', () => {
    describe('exec', () => {
        it('should return an object containing the deleted events', async () => {
            const dayOfWeek: TypeDayOfWeek = 'friday';
            const mockEvents = [
                {
                    description: 'Mocked Description 1',
                    dayOfWeek: dayOfWeek,
                },
                {
                    description: 'Mocked Description 2',
                    dayOfWeek: dayOfWeek,
                },
            ] as IEvent[];
            jest.spyOn(EventModel, 'find').mockResolvedValue(mockEvents);
            jest.spyOn(EventModel, 'deleteMany').mockResolvedValue({
                acknowledged: true,
                deletedCount: 2,
            });

            const useCase = new DeleteManyEventsUseCaseRep();
            const result = await useCase.exec(dayOfWeek);

            expect(result).toEqual({ deletedEvents: mockEvents });
        });

        it('should return an object with an empty array when no events are deleted', async () => {
            jest.spyOn(EventModel, 'find').mockResolvedValue([]);
            jest.spyOn(EventModel, 'deleteMany').mockResolvedValue({
                acknowledged: true,
                deletedCount: 0,
            });

            const useCase = new DeleteManyEventsUseCaseRep();
            const result = await useCase.exec('sunday');

            expect(result).toEqual({ deletedEvents: [] });
        });
    });
});
