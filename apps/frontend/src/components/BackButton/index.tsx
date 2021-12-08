/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: The back button
 * Version: 2021-12-01
 */

import { useRouter } from 'next/router';
import { TSimpleFunctionalComponent } from '../../types/react';
import styles from './index.module.scss';

/** Backk button props */
type TBackButton = TSimpleFunctionalComponent<{
  /** HTTP referer */
  referer: string;
}>;

/**
 * Back button
 */
const BackButton: TBackButton = ({ referer }) => {
  const router = useRouter();

  /**
   * Button click event handler
   * Either goes back in the browser history or takes you to the main page if you don't have an history
   */
  function onBack(): void {
    if (referer === window.location.host) router.back();
    else void router.push('/', '/');
  }

  return (
    <button
      className={styles.button}
      style={{
        display: router.pathname === '/nodes' ? 'none' : 'initial',
      }}
      onClick={onBack}
    >
      <div className={styles.div}>
        {/* Source: https://fonts.google.com/icons */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="dodgerblue"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </div>
    </button>
  );
};

export default BackButton;
