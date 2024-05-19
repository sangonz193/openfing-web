import { useEffect, useState } from "react"

export function useHash() {
  const [hash, setHash] = useState<string>()

  useEffect(() => {
    const listener = () => setHash(location.hash)
    listener()

    window.addEventListener("hashchange", listener)
    return () => window.removeEventListener("hashchange", listener)
  }, [])

  return hash
}
