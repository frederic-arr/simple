/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Health interface
 * Version: 2021-12-01
 */

export interface IHealth {
  isOk: boolean;
  services: {
    isSearchOk: boolean;
    isDatabaseOk: boolean;
  };
}

// ! Following Nest's naming convetions for implementations
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IsHealthy {
  isHealthy: () => Promise<boolean>;
}
