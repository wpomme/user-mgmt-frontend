import { Fetcher } from '../types'
import { backendPort, backendDomain } from '../const'

export const fetchUsers: Fetcher<any, never> = async (accessToken: string) => {
  const res = await fetch(
    `http://${backendDomain}:${backendPort}/api/v1/users`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )

  const result = await res.json()

  if (res.status >= 200) {
    return { data: result, error: null }
  }

  return { data: null, error: result }
}
