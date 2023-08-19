import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type { Observable, Subscription } from "rxjs"
import { BehaviorSubject, combineLatest } from "rxjs"
import { map } from "rxjs/operators"

import type { ReadonlyBehaviorSubject } from "../rxjs/ReadonlyBehaviorSubject"

export class CourseClassPlayerStore {
	htmlVideoElement = new BehaviorSubject<HTMLVideoElement | null>(null)
	htmlVideoWrapperElement = new BehaviorSubject<HTMLDivElement | null>(null)
	isFullscreen = new BehaviorSubject(false)
	urlHash = new BehaviorSubject("")
	readyState = new BehaviorSubject(0)
	seeking = new BehaviorSubject(false)
	paused = new BehaviorSubject(false)
	ended = new BehaviorSubject(false)
	error = new BehaviorSubject(false)
	currentTime = new BehaviorSubject(NaN)
	duration = new BehaviorSubject(NaN)
	playbackRate = new BehaviorSubject(1)
	volume = new BehaviorSubject(1)
	showControlsBlockers = new BehaviorSubject<Partial<Record<string, { timeout: NodeJS.Timeout | undefined }>>>({})
	setCurrentTimeTimeoutRef: React.MutableRefObject<number | undefined> = {
		current: undefined,
	}
	buffered = new BehaviorSubject<TimeRanges | undefined>(undefined)
	chapterTextTracks = new BehaviorSubject<VTTCue[]>([])
	activeChapterTextTracks = new BehaviorSubject<VTTCue[]>([])
	pinCourseClassList = new BehaviorSubject(true)

	track: TextTrack | undefined = undefined

	showControls!: ReadonlyBehaviorSubject<boolean>
	isPlaying!: ReadonlyBehaviorSubject<boolean>
	loaded!: ReadonlyBehaviorSubject<boolean>
	waiting!: ReadonlyBehaviorSubject<boolean>
	loadedPercentage!: ReadonlyBehaviorSubject<number>

	private trackCueChangeHandler: (() => void) | undefined = undefined

	listeners: Array<() => void> = []

	constructor() {
		const { listeners } = this

		const computedVarsConfig: Array<
			{
				[K in keyof CourseClassPlayerStore]: CourseClassPlayerStore[K] extends ReadonlyBehaviorSubject<infer T>
					? {
							key: K
							getObservable: () => Observable<T>
							defaultValue: T
					  }
					: never
			}[keyof CourseClassPlayerStore]
		> = [
			{
				key: "showControls",
				getObservable: () =>
					this.showControlsBlockers.pipe(
						map((value) => {
							return Object.keys(value).length > 0
						}, false as boolean)
					),
				defaultValue: false,
			},
			{
				key: "isPlaying",
				getObservable: () =>
					combineLatest([this.paused, this.readyState, this.ended, this.error]).pipe(
						map(([paused, readyState, ended, error]) => {
							return !paused && readyState > 2 && !ended && !error
						})
					),
				defaultValue:
					!this.paused.getValue() &&
					this.readyState.getValue() > 2 &&
					!this.ended.getValue() &&
					!this.error.getValue(),
			},
			{
				key: "loaded",
				getObservable: () => this.readyState.pipe(map((value) => value > 0)),
				defaultValue: this.readyState.getValue() > 0,
			},
			{
				key: "waiting",
				getObservable: () => this.readyState.pipe(map((value) => value < 3)),
				defaultValue: this.readyState.getValue() < 3,
			},

			{
				key: "loadedPercentage",
				getObservable: () =>
					combineLatest([this.buffered, this.currentTime, this.duration]).pipe(
						map(([buffered, currentTime, duration]) => {
							if (!buffered || Number.isNaN(currentTime) || Number.isNaN(duration)) {
								return NaN
							}

							if (buffered.length === 0) {
								return 0
							}

							let i
							let bufferedEnd = buffered.end(0)

							for (
								i = 0;
								i < buffered.length - 1 &&
								!(buffered.start(i) <= currentTime && currentTime <= buffered.end(i));
								i++
							) {
								i++
							}
							if (i < buffered.length) {
								bufferedEnd = buffered.end(i)
							}

							return (bufferedEnd * 100) / duration || 0
						})
					),
				defaultValue: 0,
			},
		]

		listeners.push(
			...computedVarsConfig.map((config) => {
				const subject = new BehaviorSubject(config.defaultValue)
				const observable = config.getObservable()
				const subscription: Subscription = (observable.subscribe as any)(subject)

				this[config.key] = subject as any
				return () => subscription.unsubscribe()
			})
		)
	}

	isBlockingShowControls(id: string): boolean {
		return !!this.showControlsBlockers.getValue()[id]
	}

	play() {
		this.htmlVideoElement.getValue()?.play()
	}

	pause() {
		this.htmlVideoElement.getValue()?.pause()
	}

	togglePlay() {
		if (this.isPlaying.getValue()) {
			this.pause()
		} else {
			this.play()
		}
	}

	blockShowControls = (id: string) => {
		const currentValue = this.showControlsBlockers.getValue()[id]

		if (currentValue?.timeout) {
			clearTimeout(currentValue.timeout)
		}

		this.showControlsBlockers.next({
			...this.showControlsBlockers.getValue(),
			[id]: { timeout: undefined },
		})
	}

	unblockShowControls = (id: string) => {
		const showControlsBlockers = this.showControlsBlockers.getValue()
		const currentValue = showControlsBlockers[id]

		if (currentValue?.timeout) {
			clearTimeout(currentValue.timeout)
		}

		const showControlsBlockersCopy = { ...showControlsBlockers }
		delete showControlsBlockersCopy[id]

		this.showControlsBlockers.next(showControlsBlockersCopy)
	}

	showControlsFor = (id: string, ms: number) => {
		const currentValue = this.showControlsBlockers.getValue()[id]

		if (currentValue?.timeout) {
			clearTimeout(currentValue.timeout)
			currentValue.timeout = setTimeout(() => this.unblockShowControls(id), ms)
		} else if (!currentValue) {
			this.showControlsBlockers.next({
				...this.showControlsBlockers.getValue(),
				[id]: {
					timeout: setTimeout(() => this.unblockShowControls(id), ms),
				},
			})
		}
	}

	setCurrentTime = (s: number) => {
		const htmlVideoElement = this.htmlVideoElement.getValue()
		const { setCurrentTimeTimeoutRef } = this

		clearTimeout(setCurrentTimeTimeoutRef.current)

		if (!htmlVideoElement) {
			return
		}

		s = Math.max(0, Math.min(htmlVideoElement.duration || 0, s))
		this.currentTime.next((htmlVideoElement.currentTime = s))
	}

	setVolume = (volume: number) => {
		const htmlVideoElement = this.htmlVideoElement.getValue()

		if (!htmlVideoElement) {
			return
		}

		const newVolume = Math.max(0, Math.min(volume, 1))
		if (Number.isFinite(newVolume)) {
			this.volume.next((htmlVideoElement.volume = newVolume))
		}
	}

	setPlaybackRate = (playbackRate: number) => {
		const htmlVideoElement = this.htmlVideoElement.getValue()

		if (!htmlVideoElement) {
			return
		}

		this.playbackRate.next((htmlVideoElement.playbackRate = playbackRate))
	}

	setFullscreen = () => {
		const htmlVideoWrapperElement = this.htmlVideoWrapperElement.getValue()
		const htmlVideoElement = this.htmlVideoElement.getValue()

		if (htmlVideoWrapperElement?.requestFullscreen) {
			htmlVideoWrapperElement.requestFullscreen()
		} else {
			htmlVideoElement?.requestFullscreen?.()
		}
	}

	exitFullscreen = () => {
		document.exitFullscreen()
	}

	toggleFullscreen = () => {
		const htmlVideoWrapperElement = this.htmlVideoWrapperElement.getValue()

		if (!!document.fullscreenElement && document.fullscreenElement === htmlVideoWrapperElement) {
			this.exitFullscreen()
		} else {
			this.setFullscreen()
		}
	}

	setVideoInstance = (video: HTMLVideoElement | null) => {
		const htmlVideoElement = this.htmlVideoElement.getValue()
		if (htmlVideoElement === video) {
			return
		}

		if (this.track && this.trackCueChangeHandler) {
			this.track.removeEventListener("cuechange", this.trackCueChangeHandler)
		}

		this.track = undefined
		this.trackCueChangeHandler = undefined

		this.htmlVideoElement.next(video)
		this.chapterTextTracks.next([])
		this.activeChapterTextTracks.next([])
	}

	setVideoWrapperInstance = (wrapper: HTMLDivElement | null) => {
		this.htmlVideoWrapperElement.next(wrapper)
	}

	setChapterTextTracks = (vttCues: VTTCue[]) => {
		const htmlVideoElement = this.htmlVideoElement.getValue()
		if (!htmlVideoElement) {
			return
		}

		const track = htmlVideoElement.addTextTrack("chapters", "Índice", "es")
		vttCues.forEach((vvtCue) => track.addCue(vvtCue))

		this.trackCueChangeHandler = () => {
			const activeCues: VTTCue[] = []

			if (track.activeCues) {
				for (let i = 0; i < (track.activeCues.length || 0); i++) {
					activeCues.push(track.activeCues[i] as VTTCue)
				}
			}

			this.activeChapterTextTracks.next(activeCues)
		}

		this.track?.removeEventListener("cuechange", this.trackCueChangeHandler)
		this.track = track
		track.addEventListener("cuechange", this.trackCueChangeHandler)

		this.chapterTextTracks.next(vttCues)
	}

	syncVideoState = () => {
		const htmlVideoElement = this.htmlVideoElement.getValue()

		const defaultValues: Pick<
			HTMLVideoElement,
			| "currentTime"
			| "duration"
			| "ended"
			| "error"
			| "paused"
			| "playbackRate"
			| "readyState"
			| "seeking"
			| "volume"
		> & { buffered: TimeRanges | undefined } = {
			currentTime: NaN,
			duration: NaN,
			ended: false,
			error: null,
			paused: false,
			buffered: undefined,
			playbackRate: 1,
			readyState: 0,
			seeking: false,
			volume: 1,
		}

		const video = htmlVideoElement || defaultValues

		dangerousKeysOf(defaultValues).forEach((key) => {
			;(this[key].next as any)(video[key])
		})
	}
}
