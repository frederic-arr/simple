import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import CardList from '../../src/components/CardList';
import { getMedias } from '../../src/lib/medias';
import { TMediaList } from '../../src/types';
import Search from '../../src/components/Search';
import styles from './index.module.scss';
import { SITE_NAME } from '../../src/constants/app';
import { FormEventHandler, useRef, useState } from 'react';
import isMobile from '../../src/lib/isMobile';
import { useRouter } from 'next/router';

/** Page props */
interface IProps {
  /** List of medias */
  medias: TMediaList;
  /** Is the user using a mobile device */
  isMobile: boolean;
  /** The search query */
  q: string | null;
}

/**
 * Media list / home page
 */
const Page: NextPage<IProps> = ({ medias: _medias, isMobile, q }) => {
  const router = useRouter();

  // Using ref here as we this does not need to trigger a render
  const timeoutHandle = useRef<NodeJS.Timeout | undefined>(undefined);

  // Our media list
  const [medias, setMedias] = useState(_medias);

  // For search progress bar
  const [isSearching, setSearching] = useState(false);
  const [query, setQuery] = useState(q ?? '');

  const handleSearchChangeEvent: FormEventHandler<HTMLInputElement> = (ev) => {
    setSearching(true);
    const { value } = ev.currentTarget;
    setQuery(value);
    if (timeoutHandle.current) clearTimeout(timeoutHandle.current);

    timeoutHandle.current = setTimeout(() => {
      void getMedias(value, isMobile ? 10 : 30, 'api').then((data) => {
        setMedias(data);
        setSearching(false);

        // Replacing the path in the history makes for a better UX when the user clicks on a card and goes back
        void router.replace(
          {
            query: {
              q: value,
            },
          },
          {
            pathname: new URL(router.asPath, 'http://localhost').pathname,
            query: {
              q: value,
            },
          },
          {
            shallow: true,
          },
        );
      });
    }, 300);
  };

  return (
    <>
      <Head>
        <title>{SITE_NAME} - Explore</title>
      </Head>
      <div
        className={`${isSearching ? '' : styles.hidden} ${
          styles['progress-bar']
        }`}
      ></div>
      <main className={styles.main}>
        <div className={styles.container}>
          <Search
            autoFocus
            className={styles.search}
            onChange={handleSearchChangeEvent}
            key="input_key"
            defaultValue={q ?? undefined}
            value={query}
          />
        </div>
        <CardList nodes={medias} />
      </main>
    </>
  );
};

/**
 * Loads the media list to be displayed and some other attributes
 */
export const getServerSideProps: GetServerSideProps<IProps> = async ({
  req,
  query,
}) => {
  const isMobileDevice = isMobile(req.headers['user-agent'] ?? '');
  return {
    props: {
      medias: await getMedias(
        query.q?.toString() ?? undefined,
        isMobileDevice ? 10 : 30,
      ),
      isMobile: isMobileDevice,
      q: query.q?.toString() ?? null,
    },
  };
};

export default Page;
