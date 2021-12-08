/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Security service
 * Version: 2021-12-01
 */

import { Injectable } from '@nestjs/common';
import { LuhnModN } from '../../../libs/algorithm';

/**
 * A mock api auth service with an example of api key validation
 * We are using a modified version of Luhn's algorithm to validate that the given key as no error early thus saving a little bit of BW and a fair bit of time on any given request.
 * In a realy production environment you'd wire up that to some sort of DB with a caching layer in front (and cache the hash, not the raw key!)
 */
@Injectable()
export class SecurityService {
  private readonly _apiKeys = {
    [process.env['ADMIN_API_KEY'] ?? '']: true,
  };
  // Crockford's Base 32 alphabet
  private readonly _luhn = new LuhnModN('0123456789ABCDEFGHJKMNPQRSTVWXYZ');

  public constructor() {
    if (process.env['ADMIN_API_KEY'] === undefined)
      throw new Error('ADMIN_API_KEY is not defined');
  }

  public async isValidApiKey(key: string): Promise<boolean> {
    if (!/^(?:[0-9A-HJKMNP-Z]{9}-){3}[0-9A-HJKMNP-Z]{9}$/u.test(key))
      return false;
    if (!this._luhn.isValid(key.replace(/-/gu, ''))) return false;

    return await new Promise((resolve) => {
      resolve(this._apiKeys[key] !== undefined);
    });
  }

  public async isAuthorizedApiKey(key: string): Promise<boolean> {
    // Just for demonstration purpose. In a real environment you'd compare the hash of the key to what is stored in a db
    return await new Promise((resolve) => {
      resolve(this._apiKeys[key] === true);
    });
  }
}
