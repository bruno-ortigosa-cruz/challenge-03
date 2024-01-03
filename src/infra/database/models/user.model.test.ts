import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { hash, genSalt } from 'bcrypt';
import { UserModel } from './user.model';

jest.mock('bcrypt', () => {
    return {
        hash: jest.fn(),
        genSalt: jest.fn(),
    };
});

describe('the pre-save hook from user model', () => {
    let mongoServer: MongoMemoryServer;
    const userData = {
        firstName: 'Test',
        lastName: 'User',
        birthDate: '01-01-2000',
        city: 'Test City',
        country: 'Test Country',
        email: 'test@example.com',
        password: 'Test Password',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should hash the password correctly', async () => {
        (genSalt as jest.Mock).mockResolvedValueOnce('salt');
        (hash as jest.Mock).mockResolvedValueOnce('hashedPassword');
        const password = 'Test Password';

        const user = await UserModel.create(userData);

        expect(user.password).not.toBe(password);
        expect(user.password).toEqual('hashedPassword');
        expect(genSalt).toHaveBeenCalledWith(10);
        expect(hash).toHaveBeenCalledWith(password, 'salt');
    });

    it('should catch an unexpected error if the bcrypt fails', async () => {
        (genSalt as jest.Mock).mockResolvedValueOnce('salt');
        (hash as jest.Mock).mockRejectedValueOnce(new Error('Test Error'));

        const algo = async () => await UserModel.create(userData);

        await expect(algo).rejects.toThrow();
    });
});
