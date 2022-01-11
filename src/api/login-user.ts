import { FormEvent } from 'react'
import { backendPort, backendDomain } from '../const'

export const loginUser = async (
  handleSuccess: (result: any) => void,
  handleError: (result: any) => void,
  event: FormEvent<HTMLFormElement>
) => {
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

  if (res.status >= 400) {
    handleError(result)
    return
  }

  if (res.status >= 200) {
    handleSuccess(result.access_token)
    return
  }
}

