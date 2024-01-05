import { StatusCodes } from 'http-status-codes';

export type TypeApiErrors =
    | 'Not Found'
    | 'Unauthorized'
    | 'Bad Request'
    | 'Internal Server Error';

export interface ICustomError {
    statusCode: StatusCodes;
    message: string;
    error: TypeApiErrors;
}

export interface IValidationError {
    type: 'Validation Error';
    errors: { resource: string; message: string }[];
}
