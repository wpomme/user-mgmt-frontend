import { Fetcher } from '../types'

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export const fetchUsers: Fetcher<any> = async (accessToken: string) => {
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

  if (res.status === 200) {
    return { data: result, error: null }
  }

  console.error(result)
  return { data: null, error: result }
}
