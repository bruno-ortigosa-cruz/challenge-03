import { StatusCodes } from 'http-status-codes';
import { ICustomError, TypeApiErrors } from '../interfaces/error.interface';

export abstract class CustomError extends Error implements ICustomError {
    public message: string;
    public statusCode: StatusCodes;
    public error: TypeApiErrors;

    constructor(
        message: string,
        statusCode: StatusCodes,
        error: TypeApiErrors,
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
    }
}
