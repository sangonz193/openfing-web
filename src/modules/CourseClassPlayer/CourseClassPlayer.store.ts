import { action, computed, observable } from "mobx";

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";

export class CourseClassPlayerStore {
	@observable htmlVideoElement: HTMLVideoElement | null = null;
	@observable htmlVideoWrapperElement: HTMLDivElement | null = null;
	@observable isFullscreen = false;
	@observable urlHash = "";
	@observable readyState = 0;
	@observable seeking = false;
	@observable paused = false;
	@observable ended = false;
	@observable error = false;
	@observable currentTime = NaN;
	@observable duration = NaN;
	@observable playbackRate = 1;
	@observable volume = 1;
	@observable showControlsBlockers = new Map<string, { timeout: NodeJS.Timeout | undefined }>();
	@observable setCurrentTimeTimeoutRef: React.MutableRefObject<number | undefined> = {
		current: undefined,
	};
	@observable buffered: TimeRanges | undefined = undefined;

	@computed get showControls() {
		return this.showControlsBlockers.size > 0;
	}

	@computed get isPlaying() {
		return !this.paused && this.readyState > 2 && !this.ended && !this.error;
	}

	@computed get loaded() {
		return this.readyState > 0;
	}

	@computed get waiting() {
		return this.readyState < 3;
	}

	@computed get loadedPercentage() {
		const { buffered, currentTime, duration } = this;

		if (!buffered || Number.isNaN(currentTime) || Number.isNaN(duration)) return NaN;

		if (buffered.length === 0) return 0;

		let i;
		let bufferedEnd = buffered.end(0);

		for (
			i = 0;
			i < buffered.length - 1 && !(buffered.start(i) <= currentTime && currentTime <= buffered.end(i));
			i++
		)
			i++;
		if (i < buffered.length) bufferedEnd = buffered.end(i);

		return (bufferedEnd * 100) / duration || 0;
	}

	isBlockingShowControls(id: string): boolean {
		return this.showControlsBlockers.has(id);
	}

	@action play() {
		this.htmlVideoElement?.play();
	}

	@action pause() {
		this.htmlVideoElement?.pause();
	}

	@action togglePlay() {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	@action.bound blockShowControls(id: string) {
		const currentValue = this.showControlsBlockers.get(id);

		if (currentValue?.timeout) clearTimeout(currentValue.timeout);

		this.showControlsBlockers.set(id, { timeout: undefined });
	}

	@action.bound unblockShowControls(id: string) {
		const currentValue = this.showControlsBlockers.get(id);

		if (currentValue?.timeout) clearTimeout(currentValue.timeout);

		this.showControlsBlockers.delete(id);
	}

	@action.bound showControlsFor(id: string, ms: number) {
		const currentValue = this.showControlsBlockers.get(id);

		if (currentValue?.timeout) {
			clearTimeout(currentValue.timeout);
			currentValue.timeout = setTimeout(() => this.unblockShowControls(id), ms);
		} else if (!currentValue)
			this.showControlsBlockers.set(id, {
				timeout: setTimeout(() => this.unblockShowControls(id), ms),
			});
	}

	@action.bound setCurrentTime(s: number) {
		const { htmlVideoElement, setCurrentTimeTimeoutRef } = this;

		clearTimeout(setCurrentTimeTimeoutRef.current);

		if (!htmlVideoElement) return;

		s = Math.max(0, Math.min(htmlVideoElement.duration || 0, s));
		this.currentTime = htmlVideoElement.currentTime = s;
	}

	setVolume(volume: number) {
		const { htmlVideoElement } = this;

		if (!htmlVideoElement) return;

		this.volume = htmlVideoElement.volume = Math.max(0, Math.min(volume, 1));
	}

	@action.bound setPlaybackRate(playbackRate: number) {
		const { htmlVideoElement } = this;

		if (!htmlVideoElement) return;

		this.playbackRate = htmlVideoElement.playbackRate = playbackRate;
	}

	@action.bound setFullscreen() {
		this.htmlVideoWrapperElement?.requestFullscreen();
	}

	@action.bound exitFullscreen() {
		document.exitFullscreen();
	}

	@action.bound toggleFullscreen() {
		const { htmlVideoWrapperElement } = this;

		if (!!document.fullscreenElement && document.fullscreenElement === htmlVideoWrapperElement)
			this.exitFullscreen();
		else this.setFullscreen();
	}

	@action.bound setUrlHash(urlHash: string) {
		this.urlHash = urlHash;
	}

	@action.bound setVideoInstance(video: HTMLVideoElement | null) {
		this.htmlVideoElement = video;
	}

	@action.bound setVideoWrapperInstance(wrapper: HTMLDivElement | null) {
		this.htmlVideoWrapperElement = wrapper;
	}

	@action.bound syncVideoState() {
		const { htmlVideoElement } = this;

		const defaultValues = {
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
		} as const;

		const video: Pick<
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
		> & { buffered: TimeRanges | undefined } = htmlVideoElement || defaultValues;

		dangerousKeysOf(defaultValues).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this[key] = video[key] as unknown;
		});
	}

	@action.bound setIsFullscreen(isFullscreen: boolean) {
		this.isFullscreen = isFullscreen;
	}
}
