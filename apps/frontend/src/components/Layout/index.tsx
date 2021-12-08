/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Site's layout
 * Version: 2021-12-01
 */

import { PropsWithChildren } from 'react';
import BackButton from '../BackButton';
import ThemeButton from '../ThemeButton';

/** Layout props */
type TLayout = PropsWithChildren<{
  /** The current theme */
  theme: string;
  /** HTTP referer */
  referer: string;
}>;

/**
 * App layout
 */
const Layout = ({ children, theme, referer }: TLayout): JSX.Element => {
  return (
    <>
      {children}
      <BackButton referer={referer} />
      <ThemeButton theme={theme} />
    </>
  );
};

export default Layout;
