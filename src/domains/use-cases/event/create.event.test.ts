import { UnauthorizedError } from '../../../helpers/errors';
import {
    IEvent,
    IReturnEventWithId,
} from '../../../helpers/interfaces/event.interface';
import { TypeJwtResponse } from '../../../helpers/middlewares/auth.middleware';
import { CreateEventUseCaseRep } from '../../../infra/repositories/use-cases/event/create.event';
import { CreateEventUseCaseSer } from './create.event';

const mockEvent = {
    _id: 'Mocked Id',
    description: 'Mocked Description 1',
    dayOfWeek: 'friday',
    userId: 'Mocked UserId',
} as IReturnEventWithId;

const mockEventInput = {
    description: mockEvent.description,
    dayOfWeek: mockEvent.dayOfWeek,
} as IEvent;

const mockJWT = {
    _id: mockEvent.userId,
    email: 'Mocked Email',
} as TypeJwtResponse;

describe('CreateEventUseCaseSer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create and return the event', async () => {
        jest.spyOn(CreateEventUseCaseRep.prototype, 'exec').mockResolvedValue(
            mockEvent,
        );

        const service = new CreateEventUseCaseSer();
        const response = await service.exec(
            mockJWT,
            mockEventInput,
            mockEvent.userId,
        );

        expect(response).toEqual(mockEvent);
    });

    it('should throw an error when user is not logged in', async () => {
        jest.spyOn(CreateEventUseCaseRep.prototype, 'exec').mockImplementation(
            jest.fn(),
        );

        const service = new CreateEventUseCaseSer();

        await expect(
            service.exec(undefined, mockEventInput, mockEvent.userId),
        ).rejects.toBeInstanceOf(UnauthorizedError);
    });
});
