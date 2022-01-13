import { useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { LayoutNoLogin } from '../../components/templates/LayoutNoLogin'

const Logout: NextPage = () => {
  useEffect(() => {
    sessionStorage.removeItem('accessToken')
  }, [])
  return (
    <LayoutNoLogin title="logout">
      <p>ログアウトしました。</p>
      <p><Link href="/login">ログイン</Link></p>
    </LayoutNoLogin>
  )
}

export default Logout
