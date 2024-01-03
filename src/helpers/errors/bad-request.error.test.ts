import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from './bad-request.error';

describe('the bad request error class', () => {
    it('should create an instance of BadRequestError with the correct properties', () => {
        const errorMessage = 'Test Message';
        const error = new BadRequestError(errorMessage);

        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toBe(errorMessage);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.error).toBe('Bad Request');
    });
});
