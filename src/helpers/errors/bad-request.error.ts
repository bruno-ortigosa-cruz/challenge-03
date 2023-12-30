import { StatusCodes } from 'http-status-codes';
import { CustomError } from './main.error';

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST, 'Bad Request');
    }
}
