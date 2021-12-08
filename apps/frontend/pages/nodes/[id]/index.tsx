import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getMediaById } from '../../../src/lib/medias';
import { IMedia } from '../../../src/types';
import Image from 'next/image';
import styles from './index.module.scss';
import { SITE_NAME } from '../../../src/constants/app';

/** Page props */
interface IProps {
  /** The media */
  media: IMedia;
}

/**
 * Media details page
 */
const Page: NextPage<IProps> = ({ media }) => {
  const { name, links, image, synopsis } = media;
  return (
    <>
      <Head>
        <title>
          {name} - {SITE_NAME}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.poster}>
              <Image
                src={image}
                alt={name}
                width={460}
                height={690}
                layout="responsive"
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.group}>
              <h2 className={styles.title}>{name}</h2>
            </div>
            <p className={styles.synopsis}>{synopsis}</p>
            <ul className={styles.list}>
              {links.map((link) => (
                <li className={styles.item} key={link}>
                  <Link href={link}>
                    <a
                      href={link}
                      className={styles.link}
                      target="_blank"
                      rel="noopener"
                    >
                      {new URL(link).hostname.split('.').slice(-2).join('.')}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            {links.length === 0 ? <em>No links available</em> : null}
          </div>
        </div>
      </main>
    </>
  );
};

/**
 * Fetch the media from the api
 */
export const getServerSideProps: GetServerSideProps<IProps> = async ({
  query,
}) => {
  const media = await getMediaById(query.id?.toString() ?? '');
  if (!media)
    return {
      notFound: true,
    };

  return {
    props: {
      media,
    },
  };
};

export default Page;
