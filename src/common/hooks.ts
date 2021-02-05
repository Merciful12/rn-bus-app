import { request } from 'graphql-request'
import { useState, useEffect } from 'react'
import { uri } from '../graphql'

export function useQuery<R, V>(query: string, variables?: V): { data: R | null, error: Error | null, loading: boolean, refetch: () => void } {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<R | null>(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    async function get() {
      try {
        setLoading(true)
        const result: R = await request<R>(uri, query, variables)
        setLoading(false)
        setData(result)
      } catch (e) {
        setLoading(false)
        setError(e)
      }
    }
    get()
  }, [])


  return { data, error, loading, refetch: () => null }
}