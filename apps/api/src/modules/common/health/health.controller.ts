/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Health controller
 * Version: 2021-12-01
 */

import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { IHealth } from './health.interface';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  public constructor(private readonly _healthService: HealthService) {}

  @Get()
  public async getHealth(): Promise<IHealth> {
    const health = await this._healthService.isHealthy();
    if (!health.isOk) throw new ServiceUnavailableException(health);
    return health;
  }
}
