import { DeleteResult } from 'mongodb';
import { EventModel } from '../../../database/models/event.model';
import { DeleteEventByIdUseCaseRep } from './delete-by-id.event';

describe('DeleteEventByIdUseCaseRep', () => {
    it('should return a delete result when given a valid id', async () => {
        const mockDeleteResult = {
            acknowledged: true,
            deletedCount: 1,
        } as DeleteResult;
        jest.spyOn(EventModel, 'deleteOne').mockResolvedValue(mockDeleteResult);

        const useCase = new DeleteEventByIdUseCaseRep();
        const result = await useCase.exec('some-valid-id');

        expect(result).toEqual(mockDeleteResult);
    });

    it('should return a delete result even when given a non existent id', async () => {
        const mockDeleteResult = {
            acknowledged: true,
            deletedCount: 0,
        } as DeleteResult;
        jest.spyOn(EventModel, 'deleteOne').mockResolvedValue(mockDeleteResult);

        const useCase = new DeleteEventByIdUseCaseRep();
        const result = await useCase.exec('non-existent-id');

        expect(result).toEqual(mockDeleteResult);
    });
});
