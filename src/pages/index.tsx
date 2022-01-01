import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './index.module.css'
import Link from 'next/link'
import { Layout } from '../components/templates/Layout'
import { Loading } from '../components/atoms/Loading'
import { ErrorMessage } from '../components/atoms/ErrorMessage'

interface SuccessResponse<Data> {
  data: Data
}

interface ErrorResponse extends Error {
  expiredAt?: string
  date?: string
}

type Fetcher<Data> = (accessToken: string) =>
  Promise<{ data: SuccessResponse<Data>, error: null } | { data: null, error: ErrorResponse }>

const fetchUsers: Fetcher<any> = async (accessToken: string) => {
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

function useFetch<Data> (fetcher: Fetcher<Data>) {
// const useFetch = (fetcher: Fetcher<Data>) => {
  const [data, setData] = useState<SuccessResponse<Data> | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchInUseEffect = async (accessToken: string) => {
      const { data, error } = await fetcher(accessToken)
      setData(data)
      setError(error)
    }
    const accessToken = sessionStorage.getItem('accessToken')

    if (!data && !error && accessToken) {
      fetchInUseEffect(accessToken ? accessToken : "")
    }
  }, [data, error, fetcher])

  return { data, error }
}

const Index: NextPage = () => {
  const { data, error } = useFetch(fetchUsers)

  if (error) {
    return <ErrorMessage {...error} />
  }

  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {data.data.map((user: any, i: number) => (
              <tr key={i}>
                <td>
                  <a href={`/users/${user.id}`}>{user.id}</a>
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  )
}

export default Index
