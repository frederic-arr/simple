/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Typesense service
 * Version: 2021-12-01
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { SearchClient } from 'typesense';
import { ConfigService, TS_NAME } from '../config';
import { ConnectionTimeoutError } from '../../../libs/errors';
import { IsHealthy } from '../health/health.interface';
import { waitUntilOrTimeout } from '../../../libs/async';
import {
  CACHE_SEARCH_RESULT_FOR_SECONDS,
  CONNECT_TRIES,
  CONNECT_TRY_INTERVAL,
} from './typesense.constants';

// TODO: Move to shared lib
@Injectable()
export class TypesenseService implements OnModuleInit, IsHealthy {
  public readonly client: SearchClient;

  public constructor(private readonly _configService: ConfigService) {
    const { hostname, port, protocol } = new URL(
      this._configService.typesenseUri,
    );

    this.client = new SearchClient({
      apiKey: this._configService.typesenseApiKey,
      nodes: [
        {
          host: hostname,
          port: parseInt(port, 10),
          protocol: protocol.slice(0, -1),
        },
      ],
      useServerSideSearchCache: true,
      cacheSearchResultsForSeconds: CACHE_SEARCH_RESULT_FOR_SECONDS,
    });
  }

  /**
   * Checks if the service healthy
   *
   * @returns Is the service healthy
   */
  public async isHealthy(): Promise<boolean> {
    try {
      const search = await this.client.collections(TS_NAME).documents().search(
        {
          q: '*',
          query_by: 'name',
        },
        { cacheSearchResultsForSeconds: 0 },
      );
      return search.out_of !== 0;
    } catch (err) {
      return false;
    }
  }

  /**
   * Initialize the Typesense service and make the application wait until it's done before accepting requests
   *
   * @see https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events
   */
  public async onModuleInit(): Promise<void> {
    const isHealthy = await waitUntilOrTimeout(
      CONNECT_TRIES,
      CONNECT_TRY_INTERVAL,
      async () => {
        return await this.isHealthy();
      },
    );

    if (!isHealthy) throw new ConnectionTimeoutError('Typesense');
  }
}
