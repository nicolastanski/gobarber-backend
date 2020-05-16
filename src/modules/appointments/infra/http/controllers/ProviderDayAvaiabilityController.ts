import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaiabilityService from '@modules/appointments/services/ListProviderDayAvaiabilityService';

export default class ProviderDayAvaiabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvaiability = container.resolve(
      ListProviderDayAvaiabilityService,
    );

    const avaiability = await listProviderDayAvaiability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(avaiability);
  }
}
