import { StatusCodes } from 'http-status-codes';
import { CustomError } from './main.error';

export class ConflictError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT, 'Conflict');
    }
}
