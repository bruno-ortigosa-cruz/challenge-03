import {
    IUserRequest,
    IUserResponse,
} from '../../../helpers/interfaces/user.interface';
import { SignUpUseCaseRep } from '../../../infra/repositories/use-cases/user/sign-up.user';
import { SignUpUseCaseSer } from './sign-up.user';

describe('SignUpUseCaseSer', () => {
    it('should return a user without password', async () => {
        const expectedResponse = {
            firstName: 'Test Name',
            lastName: 'Test Surname',
            birthDate: 'Test Date',
            city: 'Test City',
            country: 'Test Country',
            email: 'Test Email',
            _id: 'Test Id',
        };
        const dataToMock = { ...expectedResponse, password: 'Test Password' };
        const mockUser = {
            ...dataToMock,
            toJSON: function () {
                return { ...dataToMock };
            },
        } as unknown as Document & IUserResponse;
        
        jest.spyOn(SignUpUseCaseRep.prototype, 'exec').mockResolvedValue(
            mockUser,
        );

        const useCase = new SignUpUseCaseSer();
        const result = await useCase.exec({
            firstName: 'Test Name',
            lastName: 'Test Surname',
            birthDate: 'Test Date',
            city: 'Test City',
            country: 'Test Country',
            email: 'Test Email',
            password: 'Test Password',
        } as IUserRequest);

        expect(result).toEqual(expectedResponse);
    });
});
