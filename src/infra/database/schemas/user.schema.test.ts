import { UserSchema } from './user.schema';

describe('the user schema', () => {
    it('should be defined', () => {
        UserSchema;

        expect(UserSchema).toBeDefined();
    });
    it('should be of type object', () => {
        UserSchema;

        expect(typeof UserSchema).toEqual('object');
    });
});
