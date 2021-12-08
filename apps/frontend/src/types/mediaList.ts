/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media list type
 * Version: 2021-12-01
 */

/** Media when part of a list */
export interface IMediaListItem {
  /** Id of the meida */
  id: string;
  /** Name of the media */
  name: string;
  /** Link to the image of the media (should be in a tall portrait dimension) */
  image: string;
}

/** List of media */
export type TMediaList = IMediaListItem[];
