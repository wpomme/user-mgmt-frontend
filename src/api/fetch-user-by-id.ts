import { Fetcher } from '../types'
import { backendPort, backendDomain } from '../const'

export const fetchUserById: Fetcher<any, [number]> = async (accessToken: string, userId: number) => {
  const res = await fetch(
    `http://${backendDomain}:${backendPort}/api/v1/users/${userId}`,
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
