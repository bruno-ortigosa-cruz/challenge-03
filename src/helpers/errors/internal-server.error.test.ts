import { StatusCodes } from 'http-status-codes';
import { InternalServerError } from './internal-server.error';

describe('the bad request error class', () => {
    it('should create an instance of InternalServerError with the correct properties', () => {
        const error = new InternalServerError();

        expect(error).toBeInstanceOf(InternalServerError);
        expect(error.message).toBe('Something went wrong');
        expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(error.error).toBe('Internal Server Error');
    });
});
