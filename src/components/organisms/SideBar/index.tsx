import { VFC } from 'react'
import styles from './index.module.css'
import Link from 'next/link'

export const SideBar: VFC = () => {
  return (
    <aside className={styles['side-bar']}>
      <h2 className={styles['title']}>操作一覧</h2>
      <h3 className={styles['title']}>ユーザー</h3>
      <ul role="list" className={styles['users']}>
        <li className={styles['read-users']}>
          <Link href="/">一覧</Link>
        </li>
        <li className={styles['create-user']}>
          <Link href="/users/create">作成</Link>
        </li>
        <li className={styles['create-user']}>
          <Link href="#">削除</Link>
        </li>
      </ul>
    </aside>
  );
}
