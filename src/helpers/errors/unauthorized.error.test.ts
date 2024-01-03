import { StatusCodes } from 'http-status-codes';
import { UnauthorizedError } from './unauthorized.error';

describe('the bad request error class', () => {
    it('should create an instance of UnauthorizedError with the correct properties', () => {
        const errorMessage = 'Test Message';
        const error = new UnauthorizedError(errorMessage);

        expect(error).toBeInstanceOf(UnauthorizedError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(error.error).toBe('Unauthorized');
    });
});

