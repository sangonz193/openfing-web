import { useEffect, useRef, useState } from "react"

import { VIDEO_STATE_PROPERTIES, VideoState } from "./state"
import { useVideoContext } from "./video"

export function useVideoState() {
  const { store } = useVideoContext()
  const [, forceRender] = useState<object>()

  const [listenerData, setListenerData] = useState<{
    keys: Set<keyof VideoState>
    unsubscribe: () => void
  }>()

  const accessedKeys = new Set<keyof VideoState>()
  const stateAtRender = { ...store.state }
  const lastStateAtRender = useRef(stateAtRender)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const keys = [...Array.from(accessedKeys)]
    lastStateAtRender.current = stateAtRender

    if (
      listenerData &&
      keys.length === listenerData.keys.size &&
      keys.every((key) => listenerData.keys.has(key))
    ) {
      return
    }

    setListenerData({
      keys: new Set(keys),
      unsubscribe: store.subscribe((state) => {
        if (keys.some((key) => lastStateAtRender.current[key] !== state[key])) {
          forceRender({})
        }
      }),
    })
  })

  useEffect(() => {
    return () => {
      listenerData?.unsubscribe()
    }
  }, [listenerData, listenerData?.unsubscribe])

  return VIDEO_STATE_PROPERTIES.reduce((acc, key) => {
    Object.defineProperty(acc, key, {
      enumerable: true,
      get() {
        accessedKeys.add(key)
        return store.state[key]
      },
    })

    return acc
  }, {} as VideoState)
}
