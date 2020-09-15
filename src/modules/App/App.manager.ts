import { IsFocusVisibleClassName } from "@fluentui/react/lib/Utilities";
import React from "react";
import { observe } from "selector-observer";

import { useFocus } from "../../hooks";
import { useRootEventListener } from "../RootEventListeners";
import { useAppStore } from "./useAppStore";

export const AppManager: React.FC = () => {
	const store = useAppStore();

	const { handleFocus, handleBlur } = useFocus(
		{
			defaultFocus: store.isFocused,
			onFocus: () => store.setIsFocused(true),
			onBlur: () => store.setIsFocused(false),
		},
		[]
	);

	useRootEventListener("onFocus", handleFocus);
	useRootEventListener("onBlur", handleBlur);

	const isTouchTimeoutRef = React.useRef<NodeJS.Timeout>();
	const isTouchRef = React.useRef<boolean>();
	React.useEffect(() => {
		if (store.inputType === "POINTER" && "ontouchstart" in window) store.setInputType("TOUCH");

		const handleTouchStart = () => {
			if (isTouchTimeoutRef.current) clearTimeout(isTouchTimeoutRef.current);
			isTouchRef.current = true;

			store.setInputType("TOUCH");

			isTouchTimeoutRef.current = setTimeout(() => (isTouchRef.current = false), 500);
		};

		const handleMouseOver = () => {
			if (isTouchRef.current) return;

			store.setInputType("POINTER");
		};

		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("mouseover", handleMouseOver);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("mouseover", handleMouseOver);
		};
	}, []);

	React.useEffect(() => {
		return observe(`body.${IsFocusVisibleClassName}`, {
			add() {
				store.setIsFocusVisible(true);
			},
			remove() {
				store.setIsFocusVisible(false);
			},
		}).abort;
	}, []);

	return null;
};
