/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: The search bar
 * Version: 2021-12-01
 */

import { TSimpleFunctionalComponent } from '../../types/react';
import styles from './index.module.scss';

/**
 * Styled search bar component
 */
const Search: TSimpleFunctionalComponent<
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'placeholder' | 'type'
  >
> = (props) => {
  // TODO: fix re-render issue
  return (
    <input
      {...props}
      type="search"
      className={`${props.className ?? ''} ${styles.search}`}
      placeholder="Search"
    />
  );
};

export default Search;
