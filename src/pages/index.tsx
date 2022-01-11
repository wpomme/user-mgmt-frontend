import type { NextPage } from 'next'
// import styles from './index.module.css'
import { Layout } from '../components/templates/Layout'
import { Loading } from '../components/atoms/Loading'
import { ErrorMessage } from '../components/atoms/ErrorMessage'
import { fetchUsers } from '../api/fetch-users'
import { useFetch } from '../hooks/use-fetch'
import { userStatusMap } from '../const/index'

const Index: NextPage = () => {
  const { data, error } = useFetch(fetchUsers)

  if (error) {
    return <ErrorMessage {...error} />
  }

  if (!data) {
    return <Loading />
  }

  return (
    <Layout title="user list page">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Email</td>
            <td>Name</td>
            <td>Status</td>
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
              <td>{user.userStatus ? userStatusMap.get(user.userStatus.userStatus) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Index
