import { Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigService } from '../config';
import { DB_NAME } from '../config/constants';

@Injectable()
export class DbService {
  readonly database: Promise<Db> = this.init();
  private _healthy = false;

  /**
   * Checks if the database healthy
   */
  async isHealthy() {
    if (!this._healthy) return false;
    try {
      const db = await this.database;
      const replSetStatus = await db.admin().replSetGetStatus();

      return replSetStatus.ok === 1;
    } catch (err) {
      return false;
    }
  }

  constructor(private readonly configService: ConfigService) {}

  /**
   * Initalizes the databsae service
   */
  private async init() {
    const client = new MongoClient(this.configService.mongodbUri, {
      appName: this.configService.mongodbAppName,
      socketTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
      serverSelectionTimeoutMS: 5_000,
    });
    await client.connect();

    return new Promise<Db>((resolve, reject) => {
      let tries = 0;
      const interval = setInterval(async () => {
        try {
          const replSetStatus = await client.db().admin().replSetGetStatus();

          if (replSetStatus.ok === 1) {
            resolve(client.db(DB_NAME));
            this._healthy = true;
            clearInterval(interval);
            return;
          }
        } catch (err) {}

        tries++;
        if (tries > 10) {
          reject();
          clearInterval(interval);
        }
      }, 1_000);
    });
  }
}
