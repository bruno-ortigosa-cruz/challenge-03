import { NotFoundError } from '../../../helpers/errors';
import { IReturnEventWithId } from '../../../helpers/interfaces/event.interface';
import { GetAllEventsUseCaseRep } from '../../../infra/repositories/use-cases/event/get-all.event';
import { GetEventsByDayUseCaseRep } from '../../../infra/repositories/use-cases/event/get-by-day.event';
import { GetManyEventsUseCaseSer } from './get-many.event';

const mockedEvents = [
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 1',
        dayOfWeek: 'friday',
        userId: 'Mocked UserId',
    },
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 2',
        dayOfWeek: 'saturday',
        userId: 'Mocked UserId',
    },
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 3',
        dayOfWeek: 'monday',
        userId: 'Mocked UserId',
    },
    {
        _id: 'Mocked Id',
        description: 'Mocked Description 4',
        dayOfWeek: 'friday',
        userId: 'Mocked UserId',
    },
] as IReturnEventWithId[];

describe('GetManyEventsUseCaseSer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all in case there is no query', async () => {
        jest.spyOn(GetAllEventsUseCaseRep.prototype, 'exec').mockResolvedValue(
            mockedEvents,
        );

        const rep = new GetManyEventsUseCaseSer();
        const response = await rep.exec(undefined, undefined);

        expect(response).toEqual(mockedEvents);
    });

    it('should throw an error if there are no events at all', async () => {
        jest.spyOn(GetAllEventsUseCaseRep.prototype, 'exec').mockResolvedValue(
            [],
        );

        const rep = new GetManyEventsUseCaseSer();

        await expect(rep.exec(undefined, undefined)).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });

    it('should return the events that match the day argument', async () => {
        jest.spyOn(
            GetEventsByDayUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue([mockedEvents[0], mockedEvents[3]]);

        const rep = new GetManyEventsUseCaseSer();
        const response = await rep.exec('friday', undefined);

        expect(response).toEqual([mockedEvents[0], mockedEvents[3]]);
    });

    it('should return the events that match the description argument', async () => {
        jest.spyOn(
            GetEventsByDayUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue([mockedEvents[2]]);

        const rep = new GetManyEventsUseCaseSer();
        const response = await rep.exec(undefined, mockedEvents[2].description);

        expect(response).toEqual([mockedEvents[2]]);
    });

    it('should throw an error in case there are no events by description', async () => {
        jest.spyOn(
            GetEventsByDayUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue([]);

        const rep = new GetManyEventsUseCaseSer();

        await expect(rep.exec(undefined, 'not-on-db')).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });

    it('should throw an error in case there are no events by day', async () => {
        jest.spyOn(
            GetEventsByDayUseCaseRep.prototype,
            'exec',
        ).mockResolvedValue([]);

        const rep = new GetManyEventsUseCaseSer();

        await expect(rep.exec('wednesday', undefined)).rejects.toBeInstanceOf(
            NotFoundError,
        );
    });
});
