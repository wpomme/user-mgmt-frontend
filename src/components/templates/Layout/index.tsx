import { FC } from 'react'
import styles from './index.module.css'
import { Header } from '../../organisms/Header'
import { SideBar } from '../../organisms/SideBar'

export const Layout: FC = ({ children }) => {
  return (
    <>
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
