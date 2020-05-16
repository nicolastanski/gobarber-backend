import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvaiabilityService from './ListProviderDayAvaiabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaiability: ListProviderDayAvaiabilityService;

describe('ListProviderDayAvaiability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaiability = new ListProviderDayAvaiabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day avaiability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const avaiability = await listProviderDayAvaiability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(avaiability).toEqual(
      expect.arrayContaining([
        { hour: 8, avaiable: false },
        { hour: 9, avaiable: false },
        { hour: 10, avaiable: false },
        { hour: 13, avaiable: true },
        { hour: 14, avaiable: false },
        { hour: 15, avaiable: false },
        { hour: 16, avaiable: true },
      ]),
    );
  });
});
