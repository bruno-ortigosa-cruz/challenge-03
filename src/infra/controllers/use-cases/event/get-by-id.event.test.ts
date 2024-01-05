import { Request, Response } from 'express';
import { IReturnEventWithId } from '../../../../helpers/interfaces/event.interface';
import { StatusCodes } from 'http-status-codes';
import { GetEventByIdUseCaseCon } from './get-by-id.event';
import { GetEventByIdUseCaseSer } from '../../../../domains/use-cases/event/get-by-id.event';

const mockedReq = {
    params: { id: 'Mocked Id' },
} as unknown as Request;

const mockedRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

const mockedEvent = {
    _id: 'Mocked Id',
    description: 'Mocked Description',
    dayOfWeek: 'friday',
    userId: 'Mocked UserId',
} as IReturnEventWithId;

describe('GetEventByIdUseCaseCon', () => {
    it('should respond with the events when successful', async () => {
        jest.spyOn(GetEventByIdUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvent,
        );

        const controller = new GetEventByIdUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockedEvent);
    });

    it('should respond with the OK status code when successful', async () => {
        jest.spyOn(GetEventByIdUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvent,
        );

        const controller = new GetEventByIdUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.OK);
    });
});
