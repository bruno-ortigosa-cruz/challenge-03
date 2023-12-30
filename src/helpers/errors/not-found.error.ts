import { StatusCodes } from 'http-status-codes';
import { CustomError } from './main.error';

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND, 'Not Found');
    }
}
