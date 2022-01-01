import { VFC } from 'react'
import styles from './index.module.css'
import Link from 'next/link'

export const ErrorMessage: VFC<Error> = (props) => {
  const { name, message } = props
  return (
    <>
      <h1>Error!</h1>
      {name === 'TokenExpiredError' && (
        <>
          <p>ログイン期限が切れています。ログインし直してください。</p>
          <p><Link href="/login">ログイン</Link></p>
        </>
      )}
    </>
  );
}
