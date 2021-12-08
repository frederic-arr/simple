import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config';
import { Client } from 'typesense';
import { URL } from 'url';

@Injectable()
export class TypesenseService {
  readonly client: Promise<Client> = this.init();

  private _healthy = false;

  /**
   * Checks if the service healthy
   */
  async isHealthy() {
    if (!this._healthy) return false;
    try {
      const client = await this.client;
      const health = (await client.health.retrieve()) as unknown as {
        ok: boolean;
      };

      // Okey this looks dumb but we cannot just return heatlh.ok as it could be undefined, or something else
      return health.ok === true;
    } catch (err) {
      return false;
    }
  }

  constructor(private readonly configService: ConfigService) {}

  /**
   * Initalize the service
   */
  private init() {
    const { hostname, port, protocol } = new URL(
      this.configService.typesenseUri,
    );

    const client = new Client({
      apiKey: this.configService.typesenseApiKey,
      nodes: [
        {
          host: hostname,
          port: parseInt(port),
          protocol: protocol.slice(0, -1),
        },
      ],
      useServerSideSearchCache: false,
      cacheSearchResultsForSeconds: 1,
    });

    return new Promise<Client>((resolve, reject) => {
      let tries = 0;
      const interval = setInterval(async () => {
        try {
          const health = await client.health.retrieve();

          // ! Looks like Typesense has the wrong TS def
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (health.ok) {
            const debug = await client.debug.retrieve();
            if (debug.state === 1) {
              resolve(client);
              this._healthy = true;
              clearInterval(interval);
              return;
            }
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
