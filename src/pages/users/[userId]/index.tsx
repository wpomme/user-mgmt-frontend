import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/templates/Layout'
import { useRouter } from 'next/router';
import { ErrorMessage } from '../../../components/atoms/ErrorMessage'
import { fetchUserById } from '../../../api/fetch-user-by-id'
import { useFetch } from '../../../hooks/use-fetch'

const User: NextPage = () => {
  const router = useRouter()
  const { userId } = router.query
  // TODO 最初の方のデータフェッチでNaNになることがあるので修正する
  const id = Number(userId)

  const { data, error } = useFetch(fetchUserById, id)

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
