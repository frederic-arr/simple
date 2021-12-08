/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Health guard
 * Version: 2021-12-01
 */

import {
  CanActivate,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HealthService } from './health.service';

@Injectable()
export class HealthGuard implements CanActivate {
  public constructor(
    @Inject(HealthService) private readonly _healthService: HealthService,
  ) {}

  public async canActivate(): Promise<boolean> {
    return this._healthService.isHealthy().then((res) => {
      if (res.isOk) return true;
      throw new ServiceUnavailableException(res);
    });
  }
}
