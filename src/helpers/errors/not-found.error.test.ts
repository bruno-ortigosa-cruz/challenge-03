import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from './not-found.error';

describe('the bad request error class', () => {
    it('should create an instance of NotFoundError with the correct properties', () => {
        const errorMessage = 'Test Message';
        const error = new NotFoundError(errorMessage);

        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(error.error).toBe('Not Found');
    });
});
