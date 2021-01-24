import { makeVar, ReactiveVar } from "@apollo/client";

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { listenVar } from "../../_utils/listenVar";

export class CourseClassPlayerStore {
	htmlVideoElement = makeVar<HTMLVideoElement | null>(null);
	htmlVideoWrapperElement = makeVar<HTMLDivElement | null>(null);
	isFullscreen = makeVar(false);
	urlHash = makeVar("");
	readyState = makeVar(0);
	seeking = makeVar(false);
	paused = makeVar(false);
	ended = makeVar(false);
	error = makeVar(false);
	currentTime = makeVar(NaN);
	duration = makeVar(NaN);
	playbackRate = makeVar(1);
	volume = makeVar(1);
	showControlsBlockers = makeVar<Partial<Record<string, { timeout: NodeJS.Timeout | undefined }>>>({});
	setCurrentTimeTimeoutRef: React.MutableRefObject<number | undefined> = {
		current: undefined,
	};
	buffered = makeVar<TimeRanges | undefined>(undefined);
	chapterTextTracks = makeVar<VTTCue[]>([]);
	activeChapterTextTracks = makeVar<VTTCue[]>([]);
	pinCourseClassList = makeVar(true);

	track: TextTrack | undefined = undefined;

	showControls!: ReactiveVar<boolean>;
	isPlaying!: ReactiveVar<boolean>;
	loaded!: ReactiveVar<boolean>;
	waiting!: ReactiveVar<boolean>;
	loadedPercentage!: ReactiveVar<number>;

	private trackCueChangeHandler: (() => void) | undefined = undefined;

	listeners: Array<() => void> = [];

	constructor() {
		const { listeners } = this;

		const computedVarsConfig: Array<
			{
				[K in keyof CourseClassPlayerStore]: CourseClassPlayerStore[K] extends ReactiveVar<infer T>
					? {
							key: K;
							getValue: () => T;
							dependencies: Array<ReactiveVar<any>>;
					  }
					: never;
			}[keyof CourseClassPlayerStore]
		> = [
			{
				key: "showControls",
				getValue: () => Object.keys(this.showControlsBlockers()).length > 0,
				dependencies: [this.showControlsBlockers],
			},
			{
				key: "isPlaying",
				getValue: () => !this.paused() && this.readyState() > 2 && !this.ended() && !this.error(),
				dependencies: [this.paused, this.readyState, this.ended, this.error],
			},
			{
				key: "loaded",
				getValue: () => this.readyState() > 0,
				dependencies: [this.readyState],
			},
			{
				key: "waiting",
				getValue: () => this.readyState() < 3,
				dependencies: [this.readyState],
			},
			{
				key: "loadedPercentage",
				getValue: () => {
					const buffered = this.buffered();
					const currentTime = this.currentTime();
					const duration = this.duration();

					if (!buffered || Number.isNaN(currentTime) || Number.isNaN(duration)) return NaN;

					if (buffered.length === 0) return 0;

					let i;
					let bufferedEnd = buffered.end(0);

					for (
						i = 0;
						i < buffered.length - 1 &&
						!(buffered.start(i) <= currentTime && currentTime <= buffered.end(i));
						i++
					)
						i++;
					if (i < buffered.length) bufferedEnd = buffered.end(i);

					return (bufferedEnd * 100) / duration || 0;
				},
				dependencies: [this.buffered, this.currentTime, this.duration],
			},
		];

		listeners.push(
			...computedVarsConfig.map((config) => {
				const reactiveVar = makeVar(config.getValue());

				const listeners: Array<() => void> = config.dependencies.map((dependency) => {
					return listenVar(dependency, () => reactiveVar(config.getValue()));
				});

				this[config.key] = reactiveVar as any;
				return () => listeners.forEach((listener) => listener());
			})
		);
	}

	isBlockingShowControls(id: string): boolean {
		return !!this.showControlsBlockers()[id];
	}

	play() {
		this.htmlVideoElement()?.play();
	}

	pause() {
		this.htmlVideoElement()?.pause();
	}

	togglePlay() {
		if (this.isPlaying()) this.pause();
		else this.play();
	}

	blockShowControls = (id: string) => {
		const currentValue = this.showControlsBlockers()[id];

		if (currentValue?.timeout) clearTimeout(currentValue.timeout);

		this.showControlsBlockers({
			...this.showControlsBlockers(),
			[id]: { timeout: undefined },
		});
	};

	unblockShowControls = (id: string) => {
		const showControlsBlockers = this.showControlsBlockers();
		const currentValue = showControlsBlockers[id];

		if (currentValue?.timeout) clearTimeout(currentValue.timeout);

		const showControlsBlockersCopy = { ...showControlsBlockers };
		delete showControlsBlockersCopy[id];

		this.showControlsBlockers(showControlsBlockersCopy);
	};

	showControlsFor = (id: string, ms: number) => {
		const currentValue = this.showControlsBlockers()[id];

		if (currentValue?.timeout) {
			clearTimeout(currentValue.timeout);
			currentValue.timeout = setTimeout(() => this.unblockShowControls(id), ms);
		} else if (!currentValue)
			this.showControlsBlockers({
				...this.showControlsBlockers(),
				[id]: {
					timeout: setTimeout(() => this.unblockShowControls(id), ms),
				},
			});
	};

	setCurrentTime = (s: number) => {
		const htmlVideoElement = this.htmlVideoElement();
		const { setCurrentTimeTimeoutRef } = this;

		clearTimeout(setCurrentTimeTimeoutRef.current);

		if (!htmlVideoElement) return;

		s = Math.max(0, Math.min(htmlVideoElement.duration || 0, s));
		this.currentTime((htmlVideoElement.currentTime = s));
	};

	setVolume = (volume: number) => {
		const htmlVideoElement = this.htmlVideoElement();

		if (!htmlVideoElement) return;

		this.volume((htmlVideoElement.volume = Math.max(0, Math.min(volume, 1))));
	};

	setPlaybackRate = (playbackRate: number) => {
		const htmlVideoElement = this.htmlVideoElement();

		if (!htmlVideoElement) return;

		this.playbackRate((htmlVideoElement.playbackRate = playbackRate));
	};

	setFullscreen = () => {
		this.htmlVideoWrapperElement()?.requestFullscreen();
	};

	exitFullscreen = () => {
		document.exitFullscreen();
	};

	toggleFullscreen = () => {
		const htmlVideoWrapperElement = this.htmlVideoWrapperElement();

		if (!!document.fullscreenElement && document.fullscreenElement === htmlVideoWrapperElement)
			this.exitFullscreen();
		else this.setFullscreen();
	};

	setVideoInstance = (video: HTMLVideoElement | null) => {
		const htmlVideoElement = this.htmlVideoElement();
		if (htmlVideoElement === video) return;

		if (this.track && this.trackCueChangeHandler)
			this.track.removeEventListener("cuechange", this.trackCueChangeHandler);

		this.track = undefined;
		this.trackCueChangeHandler = undefined;

		this.htmlVideoElement(video);
		this.chapterTextTracks([]);
		this.activeChapterTextTracks([]);
	};

	setVideoWrapperInstance = (wrapper: HTMLDivElement | null) => {
		this.htmlVideoWrapperElement(wrapper);
	};

	setChapterTextTracks = (vttCues: VTTCue[]) => {
		const htmlVideoElement = this.htmlVideoElement();
		if (!htmlVideoElement) return;

		const track = htmlVideoElement.addTextTrack("chapters", "Índice", "es");
		vttCues.forEach((vvtCue) => track.addCue(vvtCue));

		this.trackCueChangeHandler = () => {
			const activeCues: VTTCue[] = [];

			if (track.activeCues)
				for (let i = 0; i < (track.activeCues.length || 0); i++) activeCues.push(track.activeCues[i] as VTTCue);

			this.activeChapterTextTracks(activeCues);
		};

		track.addEventListener("cuechange", this.trackCueChangeHandler);

		this.chapterTextTracks(vttCues);
	};

	syncVideoState = () => {
		const htmlVideoElement = this.htmlVideoElement();

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
		};

		const video = htmlVideoElement || defaultValues;

		dangerousKeysOf(defaultValues).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this[key](video[key] as any);
		});
	};
}
