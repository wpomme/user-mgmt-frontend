import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Logout: NextPage = () => {
  useEffect(() => {
    sessionStorage.removeItem('accessToken')
  }, [])
  return (
    <>
      <Head>
        <title>Logout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <p>ログアウトしました。</p>
        <p><Link href="/login">ログイン</Link></p>
      </>
    </>
  )
}

export default Logout
