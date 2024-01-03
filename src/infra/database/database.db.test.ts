import mongoose from 'mongoose';
import { Database } from './database.db';

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

afterAll(() => {
    jest.clearAllMocks();
});
describe('the database class', () => {
    it('should call the mongoose connect with the correct URI', () => {
        const mockedURI = 'mockedUri';
        const database = new Database(mockedURI);
        database.connect();

        expect(mongoose.connect).toHaveBeenCalledWith(mockedURI);
    });
});
