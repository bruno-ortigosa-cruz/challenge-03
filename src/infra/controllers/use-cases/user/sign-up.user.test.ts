import { Request, Response } from 'express';
import { SignUpUseCaseSer } from '../../../../domains/use-cases/user/sign-up.user';
import {
    IUserNoPassword,
    IUserRequest,
} from '../../../../helpers/interfaces/user.interface';
import { SignUpUseCaseCon } from './sign-up.user';
import { StatusCodes } from 'http-status-codes';

const mockUser = {
    firstName: 'Test Name',
    lastName: 'Test Surname',
    birthDate: 'Test Date',
    city: 'Test City',
    country: 'Test Country',
    email: 'Test Email',
    _id: 'Test Id',
} as IUserNoPassword;

const mockedSignUp = {
    ...mockUser,
    password: 'Test Password',
    confirmPassword: 'Test Password',
} as IUserRequest;

const mockedReq = { body: { ...mockedSignUp } } as Request;

const mockedRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

describe('SignUpUseCaseCon', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send the correct json as response', async () => {
        jest.spyOn(SignUpUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockUser,
        );

        const controller = new SignUpUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockUser);
    });

    it('should send the correct status code when ok', async () => {
        jest.spyOn(SignUpUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockUser,
        );

        const controller = new SignUpUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.CREATED);
    });
});
