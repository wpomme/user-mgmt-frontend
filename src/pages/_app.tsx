import { useEffect } from 'react';
import '../styles/variables.css'
import '../styles/reset.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {

  useEffect(() => {
    if (router.pathname === "/login") return
    if (router.pathname === "/logout") return

    const storageToken = sessionStorage.getItem('accessToken')
    if (!storageToken) {
      router.push('/login')
    }

  }, [router])

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
