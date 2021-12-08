/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Grid of media cards
 * Version: 2021-12-01
 */

import Card from '../../../src/components/Card';
import styles from './index.module.scss';
import { TMediaList, TSimpleFunctionalComponent } from '../../../src/types';

/** Card list props */
type TCardList = TSimpleFunctionalComponent<{
  /** List of medias */
  nodes: TMediaList;
}>;

/**
 * Grid of media cards
 */
const CardList: TCardList = ({ nodes }) => {
  return (
    <ul className={styles.container}>
      {nodes.map((node) => (
        <li className={styles.li} key={node.id}>
          <Card {...node} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
