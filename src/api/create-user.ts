import { FormEvent } from 'react'
import { backendPort, backendDomain } from '../const'

export const createUser = async (
  accessToken: string | null,
  handleSuccess: (result?: any) => void,
  handleError: (result: any) => void,
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault()

  if (!accessToken) return

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
    handleError(result)
    return
  }

  if (res.status >= 200) {
    handleSuccess(result)
    return
  }
}
