/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Simple implementation of a promise-based sleep
 * Version: 2021-12-01
 */

/**
 * Returns a promise after the delay
 *
 * @param delay - how much time to wait in ms
 * @returns nothing
 */
export async function wait(delay: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
