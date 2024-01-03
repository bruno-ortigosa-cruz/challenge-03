import { StatusCodes } from 'http-status-codes';
import { MongoServerError } from 'mongodb';
import { GenericError } from './generic.error';
import { JsonWebTokenError } from 'jsonwebtoken';
import mongoose from 'mongoose';
import pino from 'pino';

jest.mock('pino', () => jest.fn().mockReturnValue({ error: jest.fn() }));

describe('GenericError', () => {
    describe('the constructor', () => {
        it('should log when an unknown and unhandled error occurs', () => {
            const error = 'This is not an Error instance';

            new GenericError(error);

            expect(pino().error).toHaveBeenCalled();
        });

        it('should handle JsonWebTokenError', () => {
            const error = new JsonWebTokenError('Test Message');

            const genericError = new GenericError(error);

            expect(genericError.error).toBe('Unauthorized');
            expect(genericError.message).toBe('User not logged in');
            expect(genericError.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        });

        it('should handle MongoServerError with code 11000', () => {
            const error = new MongoServerError({
                code: 11000,
                keyValue: { key: 'value' },
            });

            const genericError = new GenericError(error);

            expect(genericError.error).toBe('Bad Request');
            expect(genericError.message).toBe("'key' cannot be duplicated");
            expect(genericError.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
        it('should handle MongoServerError with other codes', () => {
            const error = new MongoServerError({
                code: 12345,
                message: 'Test error',
            });

            const genericError = new GenericError(error);

            expect(genericError.error).toBe('Internal Server Error');
            expect(genericError.message).toBe('Test error');
            expect(genericError.statusCode).toBe(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        });

        it('should handle CastError', () => {
            const value = 'Test Value';
            const path = 'Test Path';
            const reason = new Error('Test Reason');
            const error = new mongoose.Error.CastError(
                'Test Error',
                value,
                path,
                reason,
            );

            const genericError = new GenericError(error);

            expect(genericError.error).toBe('Bad Request');
            expect(genericError.message).toBe(`'${value}' is not a valid id`);
            expect(genericError.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });

        it('should handle other types of errors', () => {
            const error = new Error('Test error');

            const genericError = new GenericError(error);

            expect(genericError.error).toBe('Internal Server Error');
            expect(genericError.message).toBe('Test error');
            expect(genericError.statusCode).toBe(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        });
    });

    describe('getError', () => {
        it('should return the correct error object', () => {
            const error = new Error('Test error');
            const genericError = new GenericError(error);

            const result = genericError.getError();

            expect(result).toEqual({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Test error',
                error: 'Internal Server Error',
            });
        });
    });
});
