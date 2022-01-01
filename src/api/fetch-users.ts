import { Fetcher } from '../types'

export const fetchUsers: Fetcher<any> = async (accessToken: string) => {
  const res = await fetch(
    'http://localhost:4000/api/v1/users',
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
