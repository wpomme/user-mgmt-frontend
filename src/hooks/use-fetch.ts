import { useState, useEffect } from 'react'
import { Fetcher, SuccessResponse, ErrorResponse } from '../types'

export function useFetch<Data> (fetcher: Fetcher<Data>) {
  const [data, setData] = useState<SuccessResponse<Data> | null>(null)
  const [error, setError] = useState<ErrorResponse | null>(null)

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
