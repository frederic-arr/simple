/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media validator
 * Version: 2021-12-01
 */

// TODO: Could be moved in a library

import { registerDecorator, ValidationOptions } from 'class-validator';
import { URL } from 'url';

/**
 * Options of the {IsUrlInWhitelist} validation decorator
 */
export interface IIsUrlInWhitelist {
  /** Enforce HTTPS */
  isSecure: boolean;
  /** List of whitelisted domains. If left empty, allow all */
  domains: string[];
}

/**
 * Validates that a URL is in a list of whitelisted domains
 */
// ! Following class-validator's naming convetion
// eslint-disable-next-line @typescript-eslint/naming-convention
export function IsUrlInWhitelist(
  options?: Partial<IIsUrlInWhitelist>,
  validationOptions?: ValidationOptions,
) {
  // ! Official example from the doc
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string): void => {
    registerDecorator({
      name: 'IsUrlInWhitelist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate: (value: unknown): boolean => {
          const { domains = [], isSecure = true } = options ?? {
            isSecure: true,
            domains: [],
          };

          if (typeof value !== 'string') return false;
          try {
            // TODO: Add an option to allow wildcard domains
            const url = new URL(value);
            if (isSecure && url.protocol !== 'https:') return false;

            if (domains.length > 0 && !domains.includes(url.host)) return false;
            return true;
          } catch (err) {
            return false;
          }
        },
      },
    });
  };
}
