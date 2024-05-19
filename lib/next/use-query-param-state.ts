import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useQueryParamState(key: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get(key))

  useEffect(() => {
    setValue(searchParams.get(key))
  }, [key, searchParams])

  function onChange(newValue: string) {
    setValue(newValue)

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(key, newValue)
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`
    router.push(newUrl)
  }

  return [value, onChange] as const
}
