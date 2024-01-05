import { IUserSignInResponse } from '../../../../helpers/interfaces/user.interface';
import { UserModel } from '../../../database/models/user.model';
import { SignInUseCaseRep } from './sign-in.user';

describe('SignInUseCaseRep', () => {
    describe('exec', () => {
        it('should return a user when given a valid email', async () => {
            const mockUser = {
                firstName: 'mockedName',
                lastName: 'mockedSurname',
                email: 'mockedEmail',
            } as IUserSignInResponse;
            jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);

            const useCase = new SignInUseCaseRep();
            const result = await useCase.exec({
                email: 'mockedEmail',
                password: 'test password',
            });

            expect(result).toEqual(mockUser);
            expect(result!.email).toEqual(mockUser.email);
        });

        it('should return null when given an invalid email', async () => {
            jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

            const useCase = new SignInUseCaseRep();
            const result = await useCase.exec({
                email: 'test not registered email',
                password: 'test password',
            });

            expect(result).toBeNull();
        });
    });
});
