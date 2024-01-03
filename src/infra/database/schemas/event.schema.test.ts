import { EventSchema } from './event.schema';

describe('the event schema', () => {
    it('should be defined', () => {
        EventSchema;

        expect(EventSchema).toBeDefined();
    });
    it('should be of type object', () => {
        EventSchema;

        expect(typeof EventSchema).toEqual('object');
    });
});
