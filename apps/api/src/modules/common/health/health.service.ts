/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Health service
 * Version: 2021-12-01
 */

import { Injectable } from '@nestjs/common';
import { DbService } from '../database';
import { TypesenseService } from '../typesense';
import { IHealth } from './health.interface';

@Injectable()
export class HealthService {
  public constructor(
    private readonly _typesenseService: TypesenseService,
    private readonly _dbService: DbService,
  ) {}

  /**
   * Checks if all the services are healthy
   *
   * @returns Is the service healthy
   */
  public async isHealthy(): Promise<IHealth> {
    const [isTypesenseOk, isDbOk] = await Promise.all([
      this._typesenseService.isHealthy(),
      this._dbService.isHealthy(),
    ]);

    const isOk = isTypesenseOk && isDbOk;
    return {
      isOk,
      services: {
        isSearchOk: isTypesenseOk,
        isDatabaseOk: isDbOk,
      },
    };
  }
}
