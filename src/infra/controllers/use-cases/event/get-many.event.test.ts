import { Request, Response } from 'express';
import { GetManyEventsUseCaseSer } from '../../../../domains/use-cases/event/get-many.event';
import { IReturnEventWithId } from '../../../../helpers/interfaces/event.interface';
import { GetManyEventsUseCaseCon } from './get-many.event';
import { StatusCodes } from 'http-status-codes';

const mockedReq = {
    query: { dayOfWeek: 'friday', description: 'mocked description' },
} as unknown as Request;

const mockedRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

const mockedEvents = [
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 1',
        dayOfWeek: 'friday',
        userId: 'Mocked UserId',
    },
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 2',
        dayOfWeek: 'friday',
        userId: 'Mocked UserId',
    },
] as IReturnEventWithId[];

describe('GetManyEventsUseCaseCon', () => {
    it('should respond with the events when successful', async () => {
        jest.spyOn(GetManyEventsUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvents,
        );

        const controller = new GetManyEventsUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockedEvents);
    });

    it('should respond with the OK status code when successful', async () => {
        jest.spyOn(GetManyEventsUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedEvents,
        );

        const controller = new GetManyEventsUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.OK);
    });
});
