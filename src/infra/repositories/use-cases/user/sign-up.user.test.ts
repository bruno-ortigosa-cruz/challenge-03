import {
    PreSaveLogic,
    UserModel,
    hashPassword,
} from '../../../database/models/user.model';
import { genSalt, hash } from 'bcrypt';
import { IUser } from '../../../../helpers/interfaces/user.interface';
import { SignUpUseCaseRep } from './sign-up.user';

jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

afterEach(() => {
    jest.resetAllMocks();
});

jest.doMock('../../../database/models/user.model.ts', () => {
    const userModelMock = {
        create: jest.fn(),
    };
    return {
        UserModel: userModelMock,
    };
});

describe('hash password class', () => {
    it('should hash accordingly', async () => {
        const password = 'Test Password';
        const mockedHashPassword = 'Mocked Hash';
        const mockedSalt = 'Mocked Salt';

        (genSalt as jest.Mock).mockResolvedValue(mockedSalt);
        (hash as jest.Mock).mockResolvedValue(mockedHashPassword);

        const hashResponse = await hashPassword.exec(password);

        expect(hashResponse).toEqual(mockedHashPassword);
    });
});

const mockUser = {
    firstName: 'Test Name',
    lastName: 'Test Surname',
    birthDate: '2000-01-01',
    city: 'Test City',
    country: 'Test Country',
    email: 'test@email.com',
    password: 'Test123#',
} as IUser;

describe('sign up class', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('should return the user with the correct properties', async () => {
        const mockedHashPassword = 'Mocked Hash';
        const mockedSalt = 'Mocked Salt';

        (genSalt as jest.Mock).mockResolvedValue(mockedSalt);
        (hash as jest.Mock).mockResolvedValue(mockedHashPassword);

        const mockCreate = jest.fn();
        UserModel.create = mockCreate;

        const expectedResponse = {
            ...mockUser,
            password: mockedHashPassword,
            _id: 'Test Id',
        };
        mockCreate.mockResolvedValue(expectedResponse);

        const rep = new SignUpUseCaseRep();
        const response = await rep.exec(mockUser);

        expect(response).toEqual(expectedResponse);
        expect(response.password).toEqual(mockedHashPassword);
    });

    it('should call next when password is successfully hashed', async () => {
        const next = jest.fn();

        await PreSaveLogic.exec(mockUser, next);

        expect(next).toHaveBeenCalled();
    });

    it('should throw a callback error when hashing fails', async () => {
        const mockedSalt = 'Mocked Salt';
        (genSalt as jest.Mock).mockResolvedValue(mockedSalt);
        (hash as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Test Error');
        });

        const next = jest.fn();

        await PreSaveLogic.exec(mockUser, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
