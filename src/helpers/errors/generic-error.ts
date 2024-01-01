import mongoose from 'mongoose';
import { TypeApiErrors } from '../interfaces/error.interface';
import { StatusCodes } from 'http-status-codes';

export class GenericError {
    private paramError: unknown;
    public message: string;
    public error: TypeApiErrors;
    public statusCode: StatusCodes;

    constructor(error: unknown) {
        this.paramError = error;
        this.statusCode = 500;
        this.message = 'Something went wrong';
        this.error = 'Internal Server Error';
        this.checkError();
    }

    private checkError() {
        if (this.paramError instanceof mongoose.mongo.MongoServerError) {
            if (this.paramError.code === 11000) {
                this.setProperties(
                    StatusCodes.CONFLICT,
                    `'${Object.keys(
                        this.paramError.keyValue,
                    )}' cannot be duplicated`,
                    'Conflict',
                );
            }
        } else if (this.paramError instanceof mongoose.Error.CastError) {
            this.setProperties(
                StatusCodes.BAD_REQUEST,
                `'${this.paramError.value}' is not a valid id`,
                'Bad Request',
            );
        } else {
            console.log(`Error: {\n${this.paramError}\n}`);
            return;
        }
    }

    private setProperties(
        statusCode: StatusCodes,
        message: string,
        error: TypeApiErrors,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }

    public getError() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            error: this.error,
        };
    }
}
