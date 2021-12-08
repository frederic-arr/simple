/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Number validators
 * Version: 2021-12-01
 */

/**
 * Checks if a string represents a number in N without leading zeros or sign
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function isNumberInNStrict(n: string): boolean {
  // eslint-disable-next-line require-unicode-regexp
  return /^[1-9]\d+$/.test(n);
}
