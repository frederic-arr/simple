/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Wrapper around common waitUntil or max iter
 * Version: 2021-12-01
 */

import { wait } from './wait';

export type TCallback = () => Promise<boolean>;

/**
 * Executes a callback at a certain interval until it returns true or the number of tries reach its limit
 *
 * @param maxTries - the maximum number of tries
 * @param retryInterval - how much time to wait once the callback as been executed
 * @param cb - the callback, must return true to exit the loop. If throws an error, considered as false
 * @returns is it a success
 */
export async function waitUntilOrTimeout(
  maxTries: number,
  retryInterval: number,
  cb: TCallback,
): Promise<boolean> {
  let tries = 0;
  do {
    tries++;
    await wait(retryInterval);
    const isFullfilled = await cb().catch(() => false);
    if (isFullfilled) return true;
  } while (tries < maxTries);
  return false;
}
