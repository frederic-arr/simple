/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Wrapper around the media list API
 * Version: 2021-12-01
 */

import { TMediaList } from '../../types';

/**
 * Get a list of medias
 *
 * @param query - the search query
 * @param limit - how many items to return. Min 0 max 100
 * @param href - the window location
 * @returns a list of medias
 */
export async function getMedias(
  query = '*',
  limit = 10,
  href = process.env.API_URI,
): Promise<TMediaList> {
  const url = `${href ?? ''}/data/medias?q=${encodeURIComponent(
    query,
  )}&n=${limit}`;
  const data: { medias: TMediaList } = await fetch(url).then(async (res) =>
    res.json(),
  );

  const items = data.medias;
  return items;
}
