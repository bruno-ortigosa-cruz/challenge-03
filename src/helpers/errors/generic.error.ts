import { TypeApiErrors } from '../interfaces/error.interface';
import { StatusCodes } from 'http-status-codes';
import { MongoServerError } from 'mongodb';
import pino, { Logger } from 'pino';

export class GenericError {
    private paramError: unknown;
    public message: string;
    public error: TypeApiErrors;
    public statusCode: StatusCodes;
    private logger: Logger = pino();

    constructor(error: unknown) {
        this.paramError = error;
        this.statusCode = 500;
        this.message = 'Something went wrong';
        this.error = 'Internal Server Error';
        this.checkError();
    }

    private checkError() {
        if (!(this.paramError instanceof Error)) {
            this.logger.error(this.paramError);
            return;
        }

        const errorType: string = this.paramError.constructor.name;
        const mongoError = this.paramError as MongoServerError;

        switch (errorType) {
            case 'JsonWebTokenError':
                this.setProperties('Unauthorized', 'User not logged in');
                break;
            case 'MongoServerError':
                if (mongoError.code === 11000) {
                    this.setProperties(
                        'Bad Request',
                        `'${Object.keys(
                            mongoError.keyValue,
                        )}' cannot be duplicated`,
                    );
                } else {
                    this.setProperties(
                        'Internal Server Error',
                        `${mongoError.message}`,
                    );
                }
                break;
            case 'CastError':
                this.setProperties(
                    'Bad Request',
                    `'${mongoError.value}' is not a valid id`,
                );
                break;
            default:
                this.setProperties(
                    'Internal Server Error',
                    `${this.paramError.message}`,
                );
        }
    }

    private setProperties(error: TypeApiErrors, message: string) {
        this.error = error;
        this.message = message;

        switch (error) {
            case 'Unauthorized':
                this.statusCode = StatusCodes.UNAUTHORIZED;
                break;
            case 'Bad Request':
                this.statusCode = StatusCodes.BAD_REQUEST;
                break;
            case 'Not Found':
                this.statusCode = StatusCodes.NOT_FOUND;
                break;
            case 'Internal Server Error':
                this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                break;
        }
    }

    public getError() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            error: this.error,
        };
    }
}
