import { VFC } from 'react'
import styles from './index.module.css'
import Link from 'next/link'

export const Header: VFC = () => {
  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>管理画面</h1>
      <div className={styles['header-right']}>
        <div className={styles['logout']}>
          <Link href="/logout">ログアウト</Link>
        </div>
      </div>
    </header>
  );
}
