/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Luhn Mod N alrogithm
 *              Originally from: https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm
 *              Addapted to DRY standards and a two minor performance optimization (% vs ? and ~~ instead of floor)
 * Version: 2021-12-01
 */

import { isUnique } from '../helper';

/**
 * Calculates the sum based on Luhn's algorithm
 */
function luhnSum(base: string, input: string, initialFactor: number): number {
  const n = base.length;
  let factor = initialFactor;
  let sum = 0;

  for (let i = input.length - 1; i >= 0; i--) {
    const codePoint = base.indexOf(input.charAt(i));
    let addend = factor * codePoint;

    factor = (factor % 2) + 1;

    addend = ~~(addend / n) + (addend % n);
    sum += addend;
  }

  return sum;
}

/**
 * Calculates the checksum character
 *
 * @param input - The input string
 * @param base - The input alphabet
 * @returns The checksum character
 */
export function getChecksumChar(
  input: string,
  base: string = '0123456789',
): string {
  if (!isUnique(base)) throw new Error();

  const n = base.length;
  const sum = luhnSum(base, input, 2);

  /*
   * Calculate the number that must be added to the "sum" to make it divisible by "n".
   */
  const remainder = sum % n;
  const checkCodePoint = (n - remainder) % n;

  return base.charAt(checkCodePoint);
}

/**
 * Checks if the input has a valid checksum
 * @param input - The input
 * @param base - The base alphabet
 * @returns Is the input valid?
 */
export function isValidLuhnNumber(
  input: string,
  base: string = '0123456789',
): boolean {
  if (!isUnique(base)) throw new Error();

  const n = base.length;
  const sum = luhnSum(base, input, 1);
  const remainder = sum % n;

  return remainder === 0;
}

export class LuhnModN {
  /**
   * Luhn mod N algorithm helper class
   *
   * @param _base - The base alphabet
   */
  public constructor(private readonly _base: string) {
    if (!isUnique(this._base)) throw new Error();
  }

  /**
   * Computes the checksum character
   * @param input - The input
   * @returns - The checksum character
   */
  public getChecksumChar(input: string): string {
    return getChecksumChar(input, this._base);
  }

  /**
   * Checks if the input is valid
   *
   * @param input - The input
   * @returns is the input valid
   */
  public isValid(input: string): boolean {
    return isValidLuhnNumber(input, this._base);
  }
}
