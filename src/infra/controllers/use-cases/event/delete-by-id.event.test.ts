import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DeleteEventByIdUseCaseCon } from './delete-by-id.event';
import { DeleteEventByIdUseCaseSer } from '../../../../domains/use-cases/event/delete-by-id.event';

const mockedReq = {
    params: { id: 'Mocked Id' },
} as unknown as Request;

const mockedRes = {
    sendStatus: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

describe('GetEventByIdUseCaseCon', () => {
    it('should not return any body when successful', async () => {
        jest.spyOn(
            DeleteEventByIdUseCaseSer.prototype,
            'exec',
        ).mockResolvedValue();

        const controller = new DeleteEventByIdUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).not.toHaveBeenCalled();
    });

    it('should respond with the no content status code when successful', async () => {
        jest.spyOn(
            DeleteEventByIdUseCaseSer.prototype,
            'exec',
        ).mockResolvedValue();

        const controller = new DeleteEventByIdUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.sendStatus).toHaveBeenLastCalledWith(
            StatusCodes.NO_CONTENT,
        );
    });
});
