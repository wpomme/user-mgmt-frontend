import { useState } from 'react'
import type { NextPage } from 'next'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import { loginUser } from '../../api/login-user'
import { LayoutNoLogin } from '../../components/templates/LayoutNoLogin'
import { InputBox } from '../../components/molecules/InputBox'

const Login: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const handleSuccess = (accessToken: string) => {
    sessionStorage.setItem('accessToken', accessToken)
    router.push('/')
  }

  return (
    <LayoutNoLogin title="login">
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
          <InputBox
            type="text"
            labelName="Email"
            name="email"
            placeholder="mail@example.com"
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
          <button className={styles["button"]} type="submit">Login</button>
        </div>
      </form>
    </LayoutNoLogin>
  )
}

export default Login
