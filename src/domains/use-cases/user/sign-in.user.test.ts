const mockedSign = jest
    .fn()
    .mockImplementation((_: string, __: string, ___: string) => {
        return 'mockedToken';
    });

jest.mock('jsonwebtoken', () => ({
    sign: mockedSign,
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

const mockedUser = {
    firstName: 'Test Name',
    lastName: 'Test Surname',
    birthDate: 'Test Date',
    city: 'Test City',
    country: 'Test Country',
    email: 'Test Email',
    password: 'Test Password',
    _id: 'Test Id',
} as IUser;

const mockedLogin: IUserSignInRequest = {
    email: 'Test Email',
    password: 'Test Password',
};

import { BadRequestError } from '../../../helpers/errors';
import {
    IUser,
    IUserSignInRequest,
} from '../../../helpers/interfaces/user.interface';
import { SignInUseCaseRep } from '../../../infra/repositories/use-cases/user/sign-in.user';
import { SignInUseCaseSer } from './sign-in.user';
import { compare } from 'bcrypt';

describe('SignInUseCaseSer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an user and a token when given valid credentials', async () => {
        const expectedResponse = {
            user: {
                firstName: 'Test Name',
                lastName: 'Test Surname',
                email: 'Test Email',
            },
            token: 'mockedToken',
        };
        (compare as jest.Mock).mockResolvedValue(true);
        jest.spyOn(SignInUseCaseRep.prototype, 'exec').mockResolvedValue(
            mockedUser,
        );

        const service = new SignInUseCaseSer();
        const response = await service.exec(mockedLogin);

        expect(response).toEqual(expectedResponse);
        expect(mockedSign).toHaveBeenCalledWith(
            { _id: mockedUser._id, email: mockedUser.email },
            undefined,
            { expiresIn: '7d' },
        );
    });

    it('should throw an error when given invalid credentials', async () => {
        (compare as jest.Mock).mockResolvedValue(false);

        const service = new SignInUseCaseSer();

        await expect(service.exec(mockedLogin)).rejects.toBeInstanceOf(
            BadRequestError,
        );
    });

    it('should throw an error when given invalid credentials', async () => {
        jest.spyOn(SignInUseCaseRep.prototype, 'exec').mockResolvedValue(null);

        const service = new SignInUseCaseSer();

        await expect(service.exec(mockedLogin)).rejects.toBeInstanceOf(
            BadRequestError,
        );
    });
});
