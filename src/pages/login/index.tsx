import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { loginUser } from '../../api/login-user'

const Login: NextPage = () => {
  const [email, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const handleSuccess = (accessToken: string) => {
    sessionStorage.setItem('accessToken', accessToken)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>login</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {error && <strong className={styles.error}>{error.message}</strong>}
        <form
          className={styles.form}
          method="POST"
          onSubmit={(ev) => {
            loginUser(handleSuccess, setError, ev)
          }}
        >
          <h1 className={styles.title}>Login</h1>
          <div className={styles.wrapper}>
            <div className={styles["textbox"]}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="domain@example.com"
                name="email"
                value={email}
                onChange={(ev) => {
                  setName(ev.currentTarget.value)
                }}
                required
              />
            </div>
            <div className={styles["textbox"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.currentTarget.value)
                }}
                required
              />
            </div>
            <button className={styles["button"]} type="submit">Login</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Login
