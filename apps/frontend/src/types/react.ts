/*
 * Projet: StreamGuide Frontend
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Common react types
 * Version: 2021-12-01
 */

import { PropsWithChildren } from 'react';

/** Functional component with children */
export type TFunctionalComponent<T = { [key: string]: never }> = (
  params: PropsWithChildren<T>,
) => JSX.Element;

/** Functional component without children */
export type TSimpleFunctionalComponent<T = { [key: string]: never }> = (
  params: T,
) => JSX.Element;
