import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom.error';

class TestError extends CustomError {}

describe('TestError', () => {
    it('should correctly set error properties', () => {
        const testError = new TestError(
            'Test error',
            StatusCodes.BAD_REQUEST,
            'Bad Request',
        );
        expect(testError.getError()).toEqual({
            statusCode: StatusCodes.BAD_REQUEST,
            message: 'Test error',
            error: 'Bad Request',
        });
    });
});
