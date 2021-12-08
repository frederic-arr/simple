/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Connection Timeout Error class
 * Version: 2021-12-01
 */

export class ConnectionTimeoutError extends Error {
  /**
   * Helper function for services timeouts
   *
   * @param service - name of the service that timed-out
   */
  public constructor(service: string) {
    super();
    this.name = 'ConnectionTimeoutError';
    this.message = `Connection attempt to connect to the the ${service} service timed-out`;
  }
}
