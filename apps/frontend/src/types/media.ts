/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media type
 * Version: 2021-12-01
 */

/** Full media details */
export interface IMedia {
  /** Title of the media */
  name: string;
  /** Synopsis of the media */
  synopsis: string;
  /** Link to the media image in portrait dimensions */
  image: string;
  /** List if links to external page related to the media */
  links: string[];
}
