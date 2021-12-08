import '../src/styles/globals.scss';
import type { AppProps } from 'next/app';
import { NextPageContext } from 'next';
import Layout from '../src/components/Layout';

/** App props */
interface IMyAppProps {
  /** User's theme */
  theme?: string;
  /** HTTP referer */
  referer: string;
}

function MyApp({
  Component,
  pageProps,
  ...props
}: AppProps<IMyAppProps>): JSX.Element {
  const { referer, theme = 'dark' }: IMyAppProps = props as any;
  return (
    <Layout theme={theme} referer={referer}>
      <Component {...pageProps} />
    </Layout>
  );
}

/**
 * Extract the host part of the url from the HTTP referer
 * @returns the host from the refer or empty string if invalid
 */
function getHost(referer: string): string {
  try {
    const url = new URL(referer);
    return url.host;
  } catch (err) {
    return '';
  }
}

/**
 * Loads the theme and HTTP referer into props
 */
MyApp.getInitialProps = ({
  ctx,
}: {
  ctx: NextPageContext;
}): { props: IMyAppProps } => {
  const theme = (ctx.req as any)?.cookies['user-theme'] ?? '';
  const referer = getHost(ctx.req?.headers.referer ?? '');

  return {
    props: {
      theme,
      referer,
    },
  };
};

export default MyApp;
