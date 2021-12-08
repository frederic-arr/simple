/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media interface
 * Version: 2021-12-01
 */

/** Detailed media */
export interface IMedia {
  /** Name of the media */
  name: string;
  /** Synopsis of the media */
  synopsis: string;
  /** The asbsolute url to the media's image. The image is a tall/vertical poster */
  image: string;
  /** Links if absolute links related to the media */
  links: string[];
}

/** Simplified media */
export interface IMediaListItem extends Pick<IMedia, 'image' | 'name'> {
  /** Id of the media in the database */
  id: string;
}

/** List of simplified medias */
export interface IMediaList {
  /** List of simplified medias */
  medias: IMediaListItem[];
}
