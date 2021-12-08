/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: The theme change button.
 *              Changes between dark and light theme.
 *              Store the change in the cookies.
 *
 * Version: 2021-12-01
 */

import { useState } from 'react';
import { TSimpleFunctionalComponent } from '../../types/react';
import styles from './index.module.scss';

/**
 * Get a cookie by name
 * @see https://www.w3schools.com/js/js_cookies.asp seen at 2021-12-01
 *
 * @param cname - the cookie name
 * @returns the cookie data or empty string if not found
 */
function getCookie(cname: string): string {
  if (typeof window === 'undefined') return '';
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    while (c.startsWith(' ')) c = c.substring(1);

    if (c.startsWith(name)) return c.substring(name.length, c.length);
  }
  return '';
}

/**
 * Sets a cookie by name
 * @see https://www.w3schools.com/js/js_cookies.asp seen at 2021-12-01
 *
 * @param cname - the cookie name
 * @param cvalue - the cookie value (as a string)
 * @param exdays - the expiration date of the cookie (in days)
 */
function setCookie(cname: string, cvalue: string, exdays: number): void {
  if (typeof window === 'undefined') return;
  const d = new Date();
  // eslint-disable-next-line prettier/prettier
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `Expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};SameSite=Strict;Path=/`;
}

/**
 * Dark mode/moon icon
 * @see https://fonts.google.com/icons
 * @returns A moon icon
 */
const DarkModeIcon = (): JSX.Element => {
  return (
    <svg
      className={`${styles['theme-dark']} ${styles.icon}`}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <rect fill="none" height="24" width="24" />
      <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
    </svg>
  );
};

/**
 * Light mode/sun icon
 * @see https://fonts.google.com/icons
 * @returns A sun icon
 */
const LightModeIcon = (): JSX.Element => {
  return (
    <svg
      className={`${styles['theme-light']} ${styles.icon}`}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <rect fill="none" height="24" width="24" />
      <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
    </svg>
  );
};

// List of themes
const THEMES = ['dark', 'light'];

/** ThemeButton props */
interface IThemeButton {
  /** Theme (`dark` or `light`) */
  theme: string;
}

/**
 * Theme switcher
 */
const ThemeButton: TSimpleFunctionalComponent<IThemeButton> = ({ theme }) => {
  /**
   * Get the current theme or defaults to dark
   * @returns the current theme
   */
  function getCurrentTheme(): string {
    return getCookie('user-theme') || 'dark';
  }

  /**
   * Get the next theme based on the current theme
   * @param from - optional current theme override
   * @returns the next theme
   */
  function getNextTheme(from?: string): string {
    const currentTheme = from ?? getCurrentTheme();
    const currentThemeIndex = THEMES.findIndex(
      (theme) => theme === currentTheme,
    );
    const nextTheme = THEMES[(currentThemeIndex + 1) % THEMES.length] ?? 'dark';
    return nextTheme;
  }

  const [nextTheme, setNextTheme] = useState(getNextTheme(theme));
  if (typeof window !== 'undefined')
    document.documentElement.setAttribute(
      'data-theme',
      getCurrentTheme() || theme,
    );

  /**
   * Theme change handler
   */
  const onTheme = (): void => {
    const theme = getNextTheme();
    setCookie('user-theme', theme, 1_000);
    const nextTheme = getNextTheme();
    setNextTheme(nextTheme);
  };

  return (
    <button
      className={`${styles.button} ${styles[`theme-${nextTheme}`]}`}
      onClick={onTheme}
    >
      <div className={styles.div}>
        <LightModeIcon />
        <DarkModeIcon />
      </div>
    </button>
  );
};

export default ThemeButton;
