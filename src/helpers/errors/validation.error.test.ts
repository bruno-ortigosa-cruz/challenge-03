import { ValidationError as JoiValidationError } from 'joi';
import { ValidationError } from './validation.error';

describe('ValidationError', () => {
    it('should correctly map joi validation errors', () => {
        const joiError = new JoiValidationError('test', [], null);
        joiError.details = [
            {
                path: ['field'],
                message: '"value" does not match any of the allowed types',
                type: 'any.invalidType',
                context: { key: 'value' },
            },
        ];

        const validationError = new ValidationError(joiError);
        expect(validationError.getError()).toEqual({
            type: 'Validation Error',
            errors: [
                {
                    resource: 'field',
                    message: "'value' does not match any of the allowed types",
                },
            ],
        });
    });
});
