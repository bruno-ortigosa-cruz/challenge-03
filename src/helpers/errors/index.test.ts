import * as Errors from './index';

describe('Errors', () => {
    it('should export BadRequestError', () => {
        expect(Errors.BadRequestError).toBeDefined();
    });

    it('should export UnauthorizedError', () => {
        expect(Errors.UnauthorizedError).toBeDefined();
    });

    it('should export NotFoundError', () => {
        expect(Errors.NotFoundError).toBeDefined();
    });

    it('should export InternalServerError', () => {
        expect(Errors.InternalServerError).toBeDefined();
    });
});
