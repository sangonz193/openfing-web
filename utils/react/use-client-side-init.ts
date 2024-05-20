import { useEffect, useState } from "react"

export function useClientSideInit<T extends () => unknown>(
  init: T,
  deps?: any[],
) {
  const [result, setResult] = useState<ReturnType<T> | null>(null)

  useEffect(() => {
    setResult(() => init() as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || [])

  return result
}
