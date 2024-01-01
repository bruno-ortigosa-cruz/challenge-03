import { ValidationError as IValidationError } from 'joi';

type ErrorArray = {
    resource: string;
    message: string;
}[];

export class ValidationError extends Error {
    private errors: ErrorArray;

    constructor(error: IValidationError) {
        super();
        this.errors = error.details.map((error) => {
            return {
                resource: `${error.path}`,
                message: error.message.replace(/"/g, "'"),
            };
        });
    }

    public getError() {
        return { type: 'Validation Error', errors: this.errors };
    }
}
