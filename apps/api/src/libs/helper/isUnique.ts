/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Mathematical set validity checker.
 * Version: 2021-12-01
 */

/**
 * Checks if the input is a set of unique primitive values
 * Input string is counted as a set of character, if part of an array, not
 *
 * @param input - the input set
 * @returns is the input set unique
 */
export function isUnique(input: number[] | string[] | string): boolean {
  let data = input;
  if (typeof input === 'string') data = input.split('');

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const set = new Set(data as (number | string)[]);
  return set.size === data.length;
}
