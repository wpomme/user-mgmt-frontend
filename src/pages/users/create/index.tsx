import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/templates/Layout'
import styles from './index.module.css'
import { ErrorMessage } from '../../../components/atoms/ErrorMessage'
import { useRouter } from 'next/router';
import { createUser } from '../../../api/create-user'

const CreateUser: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) {
    router.push("/login")
  }

  return (
    <Layout title="user create page">
      {/*TODO エラーの種類によってLayoutを描画するかどうか変更する*/}
      {error && <ErrorMessage {...error} />}
      <form
        className={styles.form}
        method="POST"
        onSubmit={(ev) => {
          createUser(accessToken, () => alert("success!"), setError, ev)
        }}
      >
        <h1 className={styles.title}>ユーザー作成</h1>
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
  )
}

export default CreateUser
