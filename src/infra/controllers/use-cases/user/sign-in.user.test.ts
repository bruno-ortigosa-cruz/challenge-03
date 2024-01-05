import { Request, Response } from 'express';
import { SignInUseCaseSer } from '../../../../domains/use-cases/user/sign-in.user';
import {
    ISignInReturn,
    IUserSignInRequest,
    IUserSignInResponse,
} from '../../../../helpers/interfaces/user.interface';
import { SignInUseCaseCon } from './sign-in.user';
import { StatusCodes } from 'http-status-codes';

const mockedRes = {
    header: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

const mockedSignIn: IUserSignInRequest = {
    email: 'Mocked Email',
    password: 'Mocked Password',
} as IUserSignInRequest;

const mockedReq = { body: { ...mockedSignIn } } as unknown as Request;

const mockedSignInUser: IUserSignInResponse = {
    firstName: 'Mocked Name',
    lastName: 'Mocked Surname',
    email: 'Mocked Email',
};

const mockedSignInResponse: ISignInReturn = {
    user: { ...mockedSignInUser },
    token: 'Mocked Token',
};

describe('SignInUseCaseCon', () => {
    it('should send the response with the user login', async () => {
        jest.spyOn(SignInUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedSignInResponse,
        );

        const controller = new SignInUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.json).toHaveBeenLastCalledWith(mockedSignInUser);
    });

    it('should return status OK if login was successful', async () => {
        jest.spyOn(SignInUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedSignInResponse,
        );

        const controller = new SignInUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.status).toHaveBeenLastCalledWith(StatusCodes.OK);
    });

    it('should set the auth header with the token', async () => {
        jest.spyOn(SignInUseCaseSer.prototype, 'exec').mockResolvedValue(
            mockedSignInResponse,
        );

        const controller = new SignInUseCaseCon();
        await controller.exec(mockedReq, mockedRes);

        expect(mockedRes.header).toHaveBeenLastCalledWith(
            'Authorization',
            'Bearer ' + mockedSignInResponse.token,
        );
    });
});
