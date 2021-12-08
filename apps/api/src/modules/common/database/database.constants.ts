/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Database constants
 * Version: 2021-12-01
 */

/** How many time should we try to reconnect before throwing */
export const CONNECT_TRIES = 10;
/** At what interval should we try to reconnect before throwing */
export const CONNECT_TRY_INTERVAL = 1_000;
/** DB timeout time */
export const DB_CONNECTION_TIMEOUT = 500;
/** DB selection timeout */
export const DB_SERVER_SELECTION_TIMEOUT = 1_000;
