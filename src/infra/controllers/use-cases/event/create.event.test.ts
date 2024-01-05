import { Request, Response } from 'express';
import {
    IEvent,
    IReturnEventWithId,
} from '../../../../helpers/interfaces/event.interface';
import { StatusCodes } from 'http-status-codes';
import { CreateEventUseCaseCon } from './create.event';
import { CreateEventUseCaseSer } from '../../../../domains/use-cases/event/create.event';

const mockedEventInput = {
    description: 'Mocked Description',
    dayOfWeek: 'friday',
} as IEvent;

const mockedEvent = {
    _id: 'Mocked Id',
    ...mockedEventInput,
    userId: 'Mocked UserId',
} as IReturnEventWithId;

const mockedRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

const mockedReq = {
    user: { _id: mockedEvent.userId, email: 'Mocked Email' },
    body: { ...mockedEventInput },
} as unknown as Request;

describe('CreateEventUseCaseCon', () => {
    it('should respond with the created event when successful', async () => {
        jest.spyOn(CreateEventUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvent,
        );

        const controller = new CreateEventUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockedEvent);
    });

    it('should respond with the created status code when successful', async () => {
        jest.spyOn(CreateEventUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvent,
        );

        const controller = new CreateEventUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.CREATED);
    });
});
