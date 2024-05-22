export const VIDEO_STATE_PROPERTIES = [
  "buffered",
  "currentSrc",
  "currentTime",
  "duration",
  "ended",
  "muted",
  "networkState",
  "paused",
  "playbackRate",
  "readyState",
  "seekable",
  "seeking",
  "videoHeight",
  "videoWidth",
  "volume",
] satisfies (keyof HTMLVideoElement)[]

export type VideoState = {
  [Key in (typeof VIDEO_STATE_PROPERTIES)[number]]: HTMLVideoElement[Key]
}

const initialState: VideoState = {
  buffered: { length: 0, start: () => 0, end: () => 0 },
  currentSrc: "",
  currentTime: 0,
  duration: NaN,
  ended: false,
  muted: false,
  networkState: 0,
  paused: false,
  playbackRate: 1,
  readyState: 0,
  seekable: { length: 0, start: () => 0, end: () => 0 },
  seeking: false,
  videoHeight: 0,
  videoWidth: 0,
  volume: 1,
}

export class VideoStateStore {
  private video?: HTMLVideoElement
  private removeVideoListeners?: () => void
  private stateListeners: Array<(state: VideoState) => void> = []
  private _state: VideoState = initialState

  get state() {
    return this._state
  }

  setVideoInstance(video: HTMLVideoElement | null) {
    if (this.video) {
      if (this.video === video) return

      this._state = initialState
      this.removeVideoListeners?.()
    }

    this.video = video || undefined

    if (!video) {
      return
    }

    const handlers: Partial<Record<keyof HTMLVideoElementEventMap, 0>> = {
      canplay: 0,
      canplaythrough: 0,
      durationchange: 0,
      emptied: 0,
      ended: 0,
      error: 0,
      loadeddata: 0,
      loadedmetadata: 0,
      loadstart: 0,
      pause: 0,
      play: 0,
      playing: 0,
      progress: 0,
      ratechange: 0,
      seeked: 0,
      seeking: 0,
      stalled: 0,
      suspend: 0,
      timeupdate: 0,
      volumechange: 0,
      waiting: 0,
    }

    const listenerRemovers: (() => void)[] = []

    for (const event in handlers) {
      const eventHandler = () => {
        this.updateState()
        this.fireStateListeners()
      }

      video.addEventListener(event, eventHandler)
      listenerRemovers.push(() =>
        video.removeEventListener(event, eventHandler),
      )
    }

    this.removeVideoListeners = () => listenerRemovers.forEach((u) => u())
  }

  updateState() {
    const video = this.video
    if (!video) return

    VIDEO_STATE_PROPERTIES.forEach((prop) => {
      this.state[prop] = video[prop] as never
    })
  }

  fireStateListeners() {
    this.stateListeners.forEach((listener) => listener(this.state))
  }

  subscribe(listener: (state: VideoState) => void) {
    this.stateListeners.push(listener)

    return () => {
      this.stateListeners = this.stateListeners.filter((l) => l !== listener)
    }
  }
}
