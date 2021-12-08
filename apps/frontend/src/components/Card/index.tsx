/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: A media card that displays the image and a title. When clickable redirects to the details
 * Version: 2021-12-01
 */

import { IMediaListItem, TSimpleFunctionalComponent } from '../../../src/types';
import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

/** Card props */
type TCard = TSimpleFunctionalComponent<IMediaListItem>;

/**
 * A media card
 */
const Card: TCard = ({ image, name, id }) => {
  return (
    <Link href="/nodes/[id]" as={`/nodes/${id}`}>
      <a className={styles.container}>
        <article className={styles.article}>
          <Image
            src={image}
            alt={name}
            width={460}
            height={690}
            layout="responsive"
            className={styles.poster}
          />
          <h3 className={styles.name}>{name}</h3>
        </article>
      </a>
    </Link>
  );
};

export default Card;
