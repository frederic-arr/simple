/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Wrapper around the media-by-id route of the API
 * Version: 2021-12-01
 */

import { IMedia } from '../../types';

/**
 * Gets a media by its id
 *
 * @param id - The medias'id
 * @param href - The window location
 * @returns the media
 */
export async function getMediaById(
  id: string,
  href = process.env.API_URI,
): Promise<IMedia | null> {
  const res = await fetch(`${href ?? ''}/data/medias/${id}`);
  if (res.status !== 200) return null;

  const data: IMedia = await res.json();
  return data;
}
