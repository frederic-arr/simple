/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Database service
 * Version: 2021-12-01
 */

import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigService } from '../config';
import { ConnectionTimeoutError } from '../../../libs/errors';
import { IsHealthy } from '../health/health.interface';
import { waitUntilOrTimeout } from '../../../libs/async';
import {
  DB_CONNECTION_TIMEOUT,
  CONNECT_TRIES,
  CONNECT_TRY_INTERVAL,
  DB_SERVER_SELECTION_TIMEOUT,
} from './database.constants';

@Injectable()
export class DbService
  implements OnApplicationShutdown, OnModuleInit, IsHealthy
{
  public readonly database: Db;
  private readonly _client: MongoClient;

  public constructor(private readonly _configService: ConfigService) {
    this._client = new MongoClient(this._configService.mongodbUri, {
      appName: this._configService.mongodbAppName,
      socketTimeoutMS: DB_CONNECTION_TIMEOUT,
      connectTimeoutMS: CONNECT_TRIES * CONNECT_TRY_INTERVAL,
      serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT,
    });
    this.database = this._client.db();
  }

  /**
   * Checks if the database healthy
   * It require a replica set. Running a non-replicaset db may cause UB
   * TODO: Add support for replica set
   *
   * @returns is the service healthy or not
   */
  public async isHealthy(): Promise<boolean> {
    try {
      const replSetStatus = await this.database.admin().replSetGetStatus();
      return replSetStatus['ok'] === 1;
    } catch (err) {
      return false;
    }
  }

  public async onModuleInit(): Promise<void> {
    await this._client.connect();

    const isHealthy = await waitUntilOrTimeout(
      CONNECT_TRIES,
      CONNECT_TRY_INTERVAL,
      async () => {
        const isOk = await this.isHealthy();
        return isOk;
      },
    );

    if (!isHealthy) throw new ConnectionTimeoutError('Database');
  }

  public async onApplicationShutdown(): Promise<void> {
    await this._client.close();
  }
}
