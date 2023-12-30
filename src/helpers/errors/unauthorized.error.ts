import { StatusCodes } from 'http-status-codes';
import { CustomError } from './main.error';

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }
}
