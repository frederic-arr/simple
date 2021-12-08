/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: BSON validators
 * Version: 2021-12-01
 */

/**
 * Checks if a string is a valid lowercased hexadecimal object id
 *
 * @param oid - the string representation to be tested
 * @returns is the string a valid object id
 */
export function isObjectIdStrict(oid: string): boolean {
  // eslint-disable-next-line require-unicode-regexp
  return /^[0-9a-f]{24}$/.test(oid);
}
