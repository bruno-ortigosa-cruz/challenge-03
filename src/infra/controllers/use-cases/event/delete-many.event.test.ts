import { Request, Response } from 'express';
import {
    IDeletedEvents,
    IReturnEventWithId,
} from '../../../../helpers/interfaces/event.interface';
import { StatusCodes } from 'http-status-codes';
import { DeleteManyEventsUseCaseCon } from './delete-many.event';
import { DeleteManyEventsUseCaseSer } from '../../../../domains/use-cases/event/delete-many.event';

const mockedReq = {
    query: { dayOfWeek: 'friday' },
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

const mockedDeleteResponse: IDeletedEvents = {
    deletedEvents: [...mockedEvents],
};

describe('DeleteManyEventsUseCaseCon', () => {
    it('should respond with the deleted events when successful', async () => {
        jest.spyOn(
            DeleteManyEventsUseCaseSer.prototype,
            'exec',
        ).mockResolvedValue(mockedDeleteResponse);

        const controller = new DeleteManyEventsUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockedDeleteResponse);
    });

    it('should respond with the OK status code when successful', async () => {
        jest.spyOn(
            DeleteManyEventsUseCaseSer.prototype,
            'exec',
        ).mockResolvedValue(mockedDeleteResponse);

        const controller = new DeleteManyEventsUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.OK);
    });
});
