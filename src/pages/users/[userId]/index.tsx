import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/templates/Layout'
import { useRouter } from 'next/router';
import { ErrorMessage } from '../../../components/atoms/ErrorMessage'

const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

const fetchUserById = async (accessToken: string, userId: number) => {
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

  if (res.status === 200) {
    return { data: result, error: null }
  }

  console.error(result)
  return { data: null, error: result }
}

interface FetchUsersError extends Error {
  expiredAt?: string
  date?: string
}

const User: NextPage = () => {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<FetchUsersError | null>(null)
  const { userId } = router.query
  const id = Number(userId)

  useEffect(() => {
    const fetchUserByIdInUseEffect = async (accessToken: string, id: number) => {
      const { data, error } = await fetchUserById(accessToken, id)
      setData(data)
      setError(error)
    }

    const accessToken = sessionStorage.getItem('accessToken')

    if (!data && !error && accessToken) {
      fetchUserByIdInUseEffect(accessToken, id)
    }
  }, [data, error, id])

  console.log(data)
 
  return (
    <>
      <Head>
        <title>User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {error && <ErrorMessage {...error} />}
        {data && (
          <>
            <div>{data.data.id}</div>
            <div>{data.data.email}</div>
            <div>{data.data.name}</div>
          </>
        )}
      </Layout>
    </>
  )
}

export default User
