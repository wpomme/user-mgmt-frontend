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
import { InputBox } from '../../../components/molecules/InputBox'

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

  // TODO accessTokenをcontextにする
  const accessToken = sessionStorage.getItem('accessToken')
  if (!accessToken) {
    router.push("/login")
  }

  const { data, error } = useFetch<UserStatusData[], never>(fetchAllUserStatus)

  return (
    <Layout title="user create page">
      {/*TODO エラーの種類によってLayoutを描画するかどうか変更する*/}
      {createUserError && <ErrorMessage {...createUserError} />}
      {/*TODO formのevent.currentTargetの値がInputBoxと依存していることを明示する*/}
      <form
        className={styles.form}
        method="POST"
        onSubmit={(ev) => {
          createUser(accessToken, () => alert("success!"), setCreateUserError, ev)
        }}
      >
        <h1 className={styles.title}>ユーザー作成</h1>
        <div className={styles.wrapper}>
          <InputBox
            type="text"
            labelName="名前"
            name="username"
            placeholder="山田　太郎"
            value={username}
            onChange={setUsername}
            required
          />
          <InputBox
            type="text"
            labelName="Email"
            placeholder="mail@example.com"
            name="email"
            value={email}
            onChange={setEmail}
            required
          />
          <InputBox
            type="password"
            labelName="Password"
            name="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          {data && (
            <InputBox
              type="select"
              labelName="ユーザーステータス"
              name="userStatus"
              options={Object.fromEntries(data.data.map((v) => [
                v.userStatus, userStatusMap.get(v.userStatus)
              ]))}
            />
          )}
          <button className={styles["button"]} type="submit">作成</button>
        </div>
      </form>
    </Layout>
  )
}

export default CreateUser
