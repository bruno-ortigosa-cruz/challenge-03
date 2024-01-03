import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom.error';

export class InternalServerError extends CustomError {
    constructor() {
        super(
            'Something went wrong',
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Internal Server Error',
        );
    }
}
