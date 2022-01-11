import { useState, FormEvent } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/templates/Layout'
import styles from './index.module.css'
import { ErrorMessage } from '../../../components/atoms/ErrorMessage'

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

const CreateUser: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<Error | null>(null)

  const accessToken = sessionStorage.getItem('accessToken')

  const createUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch(
      `http://${backendDomain}:${backendPort}/api/v1/users`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          data: {
            name: event.currentTarget.username.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            userStatusId: 1,
          }
        }),
      }
    )

    const result = await res.json()

    if (res.status >= 400) {
      setError(result)
      return
    }

    if (res.status >= 200) {
      alert("success!")
      return
    }
  }
  return (
    <>
      <Head>
        <title>User Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/*TODO エラーの種類によってLayoutを描画するかどうか変更する*/}
        {error && <ErrorMessage {...error} />}
        <form
          className={styles.form}
          method="POST"
          onSubmit={createUser}
        >
          <h1 className={styles.title}>Login</h1>
          <div className={styles.wrapper}>
            <div className={styles["textbox"]}>
              <label htmlFor="username">username</label>
              <input
                type="text"
                placeholder="山田　太郎"
                name="username"
                value={username}
                onChange={(ev) => {
                  setUsername(ev.currentTarget.value)
                }}
                required
              />
            </div>
            <div className={styles["textbox"]}>
              <label htmlFor="email">email</label>
              <input
                type="text"
                placeholder="mail@example.com"
                name="email"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.currentTarget.value)
                }}
                required
              />
            </div>
            <div className={styles["textbox"]}>
              <label htmlFor="password">password</label>
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
            <button className={styles["button"]} type="submit">Create User</button>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default CreateUser
