import { FC } from 'react'
import styles from './index.module.css'
import Head from 'next/head'

export interface LayoutNoLoginProps {
  title?: string
}

export const LayoutNoLogin: FC<LayoutNoLoginProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title ? title : "user management app"}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="user management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['main']}>
        { children }
      </main>
    </>
  );
}
