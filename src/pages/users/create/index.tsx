import { useState } from 'react'
import type { NextPage } from 'next'
import { Layout } from '../../../components/templates/Layout'
import styles from './index.module.css'
import { ErrorMessage } from '../../../components/atoms/ErrorMessage'
import { useRouter } from 'next/router';
import { createUser } from '../../../api/create-user'
import { fetchAllUserStatus } from '../../../api/fetch-all-user-status'
import { useFetch } from '../../../hooks/use-fetch'
import { userStatusMap } from '../../../const'

interface UserStatusData {
  id: number
  userStatus: string
}

const CreateUser: NextPage = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [createUserError, setCreateUserError] = useState<Error | null>(null)
  const router = useRouter()

  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) {
    router.push("/login")
  }

  const { data, error } = useFetch<UserStatusData[], never>(fetchAllUserStatus)

  return (
    <Layout title="user create page">
      {/*TODO エラーの種類によってLayoutを描画するかどうか変更する*/}
      {createUserError && <ErrorMessage {...createUserError} />}
      <form
        className={styles.form}
        method="POST"
        onSubmit={(ev) => {
          createUser(accessToken, () => alert("success!"), setCreateUserError, ev)
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
          <div className={styles["textbox"]}>
          <label htmlFor="userStatus">userStatus</label>
            {data && (
                <select name="userStatus">
                  {data.data.map((data: any, i: number) => (
                    <option key={i} value={data.userStatus}>{userStatusMap.get(data.userStatus)}</option>
                  ))}
                </select>
            )}
          </div>
          <button className={styles["button"]} type="submit">作成</button>
        </div>
      </form>
    </Layout>
  )
}

export default CreateUser
