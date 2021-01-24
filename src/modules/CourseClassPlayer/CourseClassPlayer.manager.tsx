import throttle from "lodash/throttle";
import React from "react";

import { useObserveProperties } from "../../hooks/useObserveProperties";
import { useBlockInitialization, useIsInitializing } from "../Initialization";
import { courseClassPlayerLocalStorage, migrateCourseClassPlayerLocalStorage } from "./CourseClassPlayer.storage";
import { useCourseClassPlayerStore } from "./useCourseClassPlayerStore";

export const CourseClassPlayerManager: React.FC = () => {
	const store = useCourseClassPlayerStore();
	const unblockInitialization = useBlockInitialization();
	const isInitializing = useIsInitializing();

	const { pinCourseClassList } = useObserveProperties(store, [
		"htmlVideoElement",
		"htmlVideoWrapperElement",
		"pinCourseClassList",
	]);
	const video = store.htmlVideoElement;
	const wrapper = store.htmlVideoWrapperElement;

	React.useState(() => {
		(async () => {
			await migrateCourseClassPlayerLocalStorage();

			const pinCourseClassList = await courseClassPlayerLocalStorage.getItem("pinCourseClassList");
			if (pinCourseClassList !== null) store.pinCourseClassList = pinCourseClassList;

			unblockInitialization();
		})();
	});

	React.useEffect(() => {
		if (!isInitializing) courseClassPlayerLocalStorage.setItem("pinCourseClassList", pinCourseClassList);
	}, [isInitializing, pinCourseClassList]);

	React.useEffect(() => {
		store.syncVideoState();

		if (!video) return;

		const throttleSyncState = throttle(() => store.syncVideoState(), 300);

		const eventMap: Partial<Record<keyof HTMLMediaElementEventMap, (e: Event) => boolean>> = {
			encrypted: undefined,
			fullscreenchange: undefined,
			fullscreenerror: undefined,
			abort: undefined,
			animationcancel: undefined,
			animationend: undefined,
			animationiteration: undefined,
			animationstart: undefined,
			auxclick: undefined,
			blur: undefined,
			cancel: undefined,
			canplay: undefined,
			canplaythrough: undefined,
			change: undefined,
			close: undefined,
			contextmenu: undefined,
			cuechange: undefined,
			dblclick: undefined,
			drag: undefined,
			dragend: undefined,
			dragenter: undefined,
			dragexit: undefined,
			dragleave: undefined,
			dragover: undefined,
			dragstart: undefined,
			drop: undefined,
			durationchange: undefined,
			emptied: undefined,
			ended: undefined,
			error: undefined,
			focus: undefined,
			gotpointercapture: undefined,
			input: undefined,
			invalid: undefined,
			keydown: undefined,
			keypress: undefined,
			keyup: undefined,
			load: undefined,
			loadeddata: undefined,
			loadedmetadata: undefined,
			loadstart: undefined,
			lostpointercapture: undefined,
			pause: undefined,
			play: undefined,
			playing: undefined,
			progress: undefined,
			ratechange: undefined,
			reset: undefined,
			scroll: undefined,
			seeked: undefined,
			seeking: undefined,
			select: undefined,
			selectionchange: undefined,
			selectstart: undefined,
			stalled: undefined,
			submit: undefined,
			suspend: undefined,
			timeupdate: undefined,
			toggle: undefined,
			transitioncancel: undefined,
			transitionend: undefined,
			transitionrun: undefined,
			transitionstart: undefined,
			volumechange: undefined,
			waiting: undefined,
			wheel: undefined,
			copy: undefined,
			cut: undefined,
			paste: undefined,
		};

		const eventListeners: Array<[keyof HTMLMediaElementEventMap, (e: Event) => void]> = [];

		for (const key in eventMap) {
			const typedKey = key as keyof HTMLMediaElementEventMap;

			eventListeners.push([
				typedKey,
				(e: Event) => {
					const value = eventMap[key as keyof HTMLMediaElementEventMap];

					if (!value || value(e)) throttleSyncState();
				},
			]);
		}

		for (const [key, eventListener] of eventListeners) video.addEventListener(key, eventListener);

		return () => {
			for (const [key, eventListener] of eventListeners) video.removeEventListener(key, eventListener);
		};
	}, [video]);

	React.useEffect(() => {
		const syncFullscreenState = () => store.setIsFullscreen(wrapper === document.fullscreenElement);
		syncFullscreenState();

		document.addEventListener("fullscreenchange", syncFullscreenState);

		return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
	}, [wrapper]);

	return null;
};
