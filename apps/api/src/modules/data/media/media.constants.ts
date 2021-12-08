/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media constants
 * Version: 2021-12-01
 */

/**
 * ! Unless specified otherwise, all length are the number of code-points
 * ! Unless specified otherwise, all durations are in ms
 */

/** Min media name length (Yup, some media only have 1 character) */
export const MIN_NAME_LENGTH = 1;
/** Max media name length (some media have stupidly long titles but it's pretty rare) */
export const MAX_NAME_LENGTH = 300;
/** Min synopsis length */
export const MIN_SYNOPSIS_LENGTH = 0;
/** Max synopsis length (it's a synopsis, not the complete plot so 1'000 characters should be enough) */
export const MAX_SYNOPSIS_LENGTH = 1_000;

/** Default page */
export const DEFAULT_PAGE = 1;
/** Default amount of items to return in a single request */
export const DEFAULT_LIMIT = 20;
/** Max size of the query string */
export const MAX_QUERY_LENGTH = 300;
/** Max amount of items to return in a single request */
export const MAX_LIMIT = 100;
/** Max theoratical number of items */
export const MAX_SPECULATIVE_TOTAL = 500;
/** How long to cache the result */
export const CACHE_SEARCH_RESULT_FOR_SECONDS = 30;
/** Lowest possible page */
export const MIN_PAGE = 1;
