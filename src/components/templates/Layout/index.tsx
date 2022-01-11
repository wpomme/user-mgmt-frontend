import { FC } from 'react'
import styles from './index.module.css'
import { Header } from '../../organisms/Header'
import { SideBar } from '../../organisms/SideBar'
import Head from 'next/head'

export interface LayoutProps {
  title?: string
}

export const Layout: FC<LayoutProps> = ({ title, children }) => {
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

      <Header />
      <div className={styles['layout-side-bar']}>
        <SideBar />
        <main className={styles['main']}>
          { children }
        </main>
      </div>
    </>
  );
}
