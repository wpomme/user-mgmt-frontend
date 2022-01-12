import { Fetcher } from '../types'
import { backendPort, backendDomain } from '../const'

export const fetchAllUserStatus: Fetcher<any, never> = async (accessToken: string) => {
  const res = await fetch(
    `http://${backendDomain}:${backendPort}/api/v1/user-status`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )

  const result = await res.json()

  if (res.status >= 400) {
    return { data: null, error: result }
  }

  return { data: result, error: null }
}
