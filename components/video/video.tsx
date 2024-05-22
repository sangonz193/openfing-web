"use client"

import {
  ComponentProps,
  PropsWithChildren,
  PropsWithoutRef,
  RefObject,
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
} from "react"

import { VideoStateStore } from "./state"

type ContextValue = {
  videoRef: RefObject<HTMLVideoElement>
  store: VideoStateStore
}

const Context = createContext<ContextValue>(null as any)

export function useVideoContext() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider")
  }

  return context
}

export function VideoProvider({ children }: PropsWithChildren) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [store] = useState(() => new VideoStateStore())

  return (
    <Context.Provider value={{ videoRef, store }}>{children}</Context.Provider>
  )
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export const Video = forwardRef<
  HTMLVideoElement,
  PropsWithoutRef<ComponentProps<"video">>
>(function VideoForwardRef(props, ref) {
  const { videoRef, store } = useVideoContext()

  return (
    <video
      ref={(v) => {
        store.setVideoInstance(v)
        ;(videoRef as Writeable<typeof videoRef>).current = v

        if (typeof ref === "function") {
          ref(v)
        } else if (ref && typeof ref === "object") {
          ;(ref as Writeable<typeof ref>).current = v
        }
      }}
      {...props}
    />
  )
})
