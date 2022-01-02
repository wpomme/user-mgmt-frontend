import { useState, useEffect } from 'react'
import { Fetcher, SuccessResponse, ErrorResponse } from '../types'

export function useFetch<DATA, ARGS extends unknown[]> (fetcher: Fetcher<DATA, ARGS>, ...args: ARGS) {
  const [data, setData] = useState<SuccessResponse<DATA> | null>(null)
  const [error, setError] = useState<ErrorResponse | null>(null)

  useEffect(() => {
    const fetchInUseEffect = async (accessToken: string, ...args: ARGS) => {
      const { data, error } = await fetcher(accessToken, ...args)
      setData(data)
      setError(error)
    }
    const accessToken = sessionStorage.getItem('accessToken')

    if (!data && !error && accessToken) {
      fetchInUseEffect(accessToken, ...args)
    }
  }, [data, error, fetcher, args])

  return { data, error }
}
