import { useState, FormEvent } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.css'
import { useRouter } from 'next/router'

// TODO loginUserを移動する
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

const Login: NextPage = () => {
  const [email, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch(
      `http://${backendDomain}:${backendPort}/api/v1/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
        }),
      }
    )

    const result = await res.json()

    if (res.status >= 200) {
      sessionStorage.setItem('accessToken', result.access_token)
      router.push('/')
    }

    if (res.status >= 400) {
      setError(result)
    }
  }

  return (
    <>
      <Head>
        <title>login</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {error && <div className={styles.error}>{error.message}</div>}
        <form
          className={styles.form}
          method="POST"
          onSubmit={loginUser}
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
