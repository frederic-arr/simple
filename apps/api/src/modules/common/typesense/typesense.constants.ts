/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Typesense constants
 * Version: 2021-12-01
 */

/** How many time should we try to reconnect before throwing */
export const CONNECT_TRIES = 10;
/** At what interval should we try to reconnect before throwing */
export const CONNECT_TRY_INTERVAL = 1_000;
/** For how long should search result be cached (in seconds) */
export const CACHE_SEARCH_RESULT_FOR_SECONDS = 30;
