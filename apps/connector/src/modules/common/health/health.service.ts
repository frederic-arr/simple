import { Injectable } from '@nestjs/common';
import { MediaService } from '../../../modules/data/media';
import { DbService, TypesenseService } from '..';

@Injectable()
export class HealthService {
  constructor(
    private readonly typesenseService: TypesenseService,
    private readonly dbService: DbService,
    private readonly mediaService: MediaService,
  ) {}

  /**
   * Checks if all the services are healthy
   */
  async isHealthy() {
    const typesense = await this.typesenseService.isHealthy();
    const db = await this.dbService.isHealthy();
    const media = await this.mediaService.isHealthy();

    const ok = typesense && db && media;
    return {
      ok,
      services: {
        search: typesense,
        database: db,
        media_index: media,
      },
    };
  }
}
