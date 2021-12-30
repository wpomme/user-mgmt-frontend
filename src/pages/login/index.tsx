import { useState, useEffect, FormEvent } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.css'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const [email, setName] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')
    console.log(accessToken)
  }, [])

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch(
      'http://localhost:4000/api/v1/login',
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

    if (res.status === 200) {
      const result = await res.json()
      sessionStorage.setItem('accessToken', result.access_token)
      router.push('/')
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
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Login
