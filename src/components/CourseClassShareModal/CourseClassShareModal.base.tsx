import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { Dialog } from "@fluentui/react/lib/Dialog";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Stack } from "@fluentui/react/lib/Stack";
import { ITextFieldProps, TextField } from "@fluentui/react/lib/TextField";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { copyToClipboard } from "src/_utils/copyToClipboard";

import { pick } from "../../_utils/pick";
import { secondsToString } from "../../_utils/secondsToString";
import { appConfig } from "../../appConfig";
import { useReactiveVars } from "../../hooks/useReactiveVars";
import { useCourseClassPlayerStore } from "../../modules/CourseClassPlayer";
import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { routeConfigMap } from "../../routeConfigMap";
import { useCourseClassByIdQuery } from "./CourseClassShareModal.graphql.generated";
import {
	CourseClassShareModalProps,
	CourseClassShareModalStyleProps,
	CourseClassShareModalStyles,
} from "./CourseClassShareModal.types";

const getClassNames = classNamesFunction<CourseClassShareModalStyleProps, CourseClassShareModalStyles>();

type CourseClassShareModalReducerState = {
	startOn: boolean;
	startOnSeconds: number;
	startOnInputValue: string;
	endOn: boolean;
	endOnSeconds: number;
	endOnInputValue: string;

	courseClassListCode?: string;
	courseClassNo?: number;
};

type CourseClassShareModalReducerAction =
	| {
			type: "toggle-start-on" | "toggle-end-on" | "calculate-url";
	  }
	| {
			type: "reset";
			seconds: number | undefined;
			courseClassListCode: string | undefined;
			courseClassNo: number | undefined;
	  }
	| {
			type: "update-start-on-input-value" | "update-end-on-input-value";
			value: string;
	  };

const init = (options: {
	seconds: number | undefined;
	courseClassListCode: string | undefined;
	courseClassNo: number | undefined;
}): CourseClassShareModalReducerState => {
	const { courseClassListCode, courseClassNo } = options;

	const seconds = Math.floor(options.seconds || 0);
	const endOnSeconds = seconds + 1;

	return {
		startOn: false,
		startOnSeconds: seconds,
		startOnInputValue: secondsToString(seconds),
		endOn: false,
		endOnSeconds,
		endOnInputValue: secondsToString(endOnSeconds),
		courseClassListCode,
		courseClassNo,
	};
};

const reducer: React.Reducer<CourseClassShareModalReducerState, CourseClassShareModalReducerAction> = (
	prevState,
	action
): CourseClassShareModalReducerState => {
	if (action.type === "toggle-start-on")
		return {
			...prevState,
			startOn: !prevState.startOn,
			...(prevState.startOn && {
				endOn: false,
			}),
		};

	if (action.type === "toggle-end-on") {
		if (prevState.endOn || prevState.startOn)
			return {
				...prevState,
				endOn: !prevState.endOn,
			};

		return prevState;
	}

	if (action.type === "update-start-on-input-value")
		return {
			...prevState,
			startOnInputValue: action.value,
		};

	if (action.type === "update-end-on-input-value")
		return {
			...prevState,
			endOnInputValue: action.value,
		};

	if (action.type === "reset") return init(action);

	if (action.type === "calculate-url") {
		const getSecondsFromArray = (array: string[]): number | undefined => {
			let result: number | undefined;

			if (array.length === 1) {
				const parsedSeconds = Number(array[0]);

				if (!Number.isNaN(parsedSeconds)) result = parsedSeconds;
			} else if (array.length === 2) {
				const parsedMinutes = Number(array[0]);
				const parsedSeconds = Number(array[1]);

				result = Number.isNaN(parsedMinutes)
					? undefined
					: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds);
			} else if (array.length > 2) {
				const parsedHours = Number(array[0]);
				const parsedMinutes = Number(array[1]);
				const parsedSeconds = Number(array[2]);

				result = Number.isNaN(parsedHours)
					? undefined
					: parsedHours * 60 * 60 +
					  (Number.isNaN(parsedMinutes)
							? 0
							: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds));
			}

			return result;
		};

		let startOnValue = prevState.startOnInputValue.trim();
		let startOnSeconds = getSecondsFromArray(startOnValue.length === 0 ? [] : startOnValue.split(":"));

		if (startOnSeconds !== undefined) startOnSeconds = Math.floor(startOnSeconds);
		else startOnSeconds = 0;
		startOnValue = secondsToString(startOnSeconds);

		let endOnValue = prevState.endOnInputValue.trim();
		let endOnSeconds = getSecondsFromArray(endOnValue.length === 0 ? [] : endOnValue.split(":"));

		if (endOnSeconds !== undefined) endOnSeconds = Math.floor(endOnSeconds);
		else endOnSeconds = startOnSeconds;
		endOnSeconds = Math.max(startOnSeconds + 1, endOnSeconds);

		endOnValue = secondsToString(endOnSeconds);

		return {
			...prevState,
			startOnInputValue: startOnValue,
			startOnSeconds,
			endOnInputValue: endOnValue,
			endOnSeconds,
		};
	}

	return init({
		seconds: undefined,
		courseClassListCode: prevState.courseClassListCode,
		courseClassNo: prevState.courseClassNo,
	});
};

export const CourseClassShareModalBase = (props: CourseClassShareModalProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const [state, dispatch] = React.useReducer(reducer, undefined, () =>
		init({
			seconds: 0,
			courseClassListCode: undefined,
			courseClassNo: undefined,
		})
	);
	const [successfulMessageVisible, setSuccessfulMessageVisible] = React.useState(false);

	const courseClassId = useReactiveVars(useCourseSelectionStore(), ["selection"]).selection.courseClassId;
	const courseClassListResponse = useCourseClassByIdQuery({
		skip: !courseClassId,
		variables: courseClassId
			? {
					id: courseClassId,
			  }
			: undefined,
	});

	const courseClassPlayerStore = useCourseClassPlayerStore();
	const courseClass =
		courseClassListResponse.data?.courseClassById.__typename === "CourseClass"
			? courseClassListResponse.data.courseClassById
			: undefined;
	React.useEffect(() => {
		if (props.visible) {
			if (courseClass?.courseClassList?.code && courseClass.number)
				dispatch({
					type: "reset",
					courseClassListCode: courseClass.courseClassList.code,
					courseClassNo: courseClass.number,
					seconds: courseClassPlayerStore.currentTime,
				});
			else dispatch({ type: "reset", courseClassListCode: undefined, courseClassNo: undefined, seconds: 0 });

			setSuccessfulMessageVisible(false);
		}
	}, [props.visible, courseClass]);

	const url = React.useMemo(() => {
		const { courseClassListCode, courseClassNo, startOnSeconds, endOnSeconds } = state;

		if (!courseClassListCode || !courseClassNo) return "";

		return (
			appConfig.baseUrl +
			routeConfigMap.course.path({
				courseClassListCode,
				courseClassNo,
				...(state.startOn && {
					startOnSeconds: startOnSeconds,
					endOnSeconds: state.endOn ? endOnSeconds : undefined,
				}),
			})
		);
	}, Object.values(pick(state, ["courseClassListCode", "courseClassNo", "startOn", "startOnSeconds", "endOn", "endOnSeconds"])));

	const handleCopy = React.useCallback(() => {
		copyToClipboard(url);
		setSuccessfulMessageVisible(true);
	}, [url]);

	const handleStartOnCheckboxChange = React.useCallback(() => dispatch({ type: "toggle-start-on" }), []);

	const handleStartOnInputChange = React.useCallback<Required<ITextFieldProps>["onChange"]>((_, value) => {
		if (typeof value === "string") dispatch({ type: "update-start-on-input-value", value });
	}, []);
	const handleStartOnInputBlur = React.useCallback<Required<ITextFieldProps>["onBlur"]>(() => {
		dispatch({ type: "calculate-url" });
	}, []);

	const handleEndOnCheckboxChange = React.useCallback(() => dispatch({ type: "toggle-end-on" }), []);

	const handleEndOnInputChange = React.useCallback<Required<ITextFieldProps>["onChange"]>((_, value) => {
		if (typeof value === "string") dispatch({ type: "update-end-on-input-value", value });
	}, []);
	const handleEndOnInputBlur = React.useCallback<Required<ITextFieldProps>["onBlur"]>(() => {
		dispatch({ type: "calculate-url" });
	}, []);

	return (
		<Dialog
			hidden={!props.visible}
			dialogContentProps={{
				title: "Compartir",
				showCloseButton: true,
			}}
			modalProps={{
				isModeless: true,
				dragOptions: { closeMenuItemText: "Cerrar", moveMenuItemText: "Mover", menu: ContextualMenu },
				onDismiss: props.onClose,
			}}
			onDismiss={props.onClose}
		>
			<Stack tokens={{ childrenGap: 20 }}>
				<Stack horizontal>
					<Stack.Item grow={1}>
						<TextField styles={classNames.subComponentStyles.urlTextField} value={url} readOnly />
					</Stack.Item>

					<Stack.Item grow={0} shrink={0}>
						<PrimaryButton
							title="Copiar"
							iconProps={{ iconName: "Copy" }}
							styles={classNames.subComponentStyles.copyButton()}
							onClick={handleCopy}
						/>
					</Stack.Item>
				</Stack>

				{successfulMessageVisible && (
					<MessageBar
						messageBarType={MessageBarType.success}
						dismissIconProps={{
							styles: classNames.subComponentStyles.messageBarDismissIcon,
							iconName: "Cancel",
						}}
						onDismiss={() => setSuccessfulMessageVisible(false)}
					>
						Copiado
					</MessageBar>
				)}

				<Stack tokens={{ childrenGap: 10 }} verticalAlign="center">
					<Stack.Item grow={0} shrink={0}>
						<Checkbox label="Iniciar en: " checked={state.startOn} onChange={handleStartOnCheckboxChange} />
					</Stack.Item>

					<Stack.Item grow={1} shrink={1}>
						<TextField
							styles={classNames.subComponentStyles.textField}
							value={state.startOnInputValue}
							disabled={!state.startOn}
							onChange={handleStartOnInputChange}
							onBlur={handleStartOnInputBlur}
						/>
					</Stack.Item>
				</Stack>

				<Stack tokens={{ childrenGap: 10 }} verticalAlign="center">
					<Stack.Item grow={0} shrink={0}>
						<Checkbox
							label="Terminar en: "
							checked={state.endOn}
							disabled={!state.startOn}
							onChange={handleEndOnCheckboxChange}
						/>
					</Stack.Item>

					<Stack.Item grow={1} shrink={1}>
						<TextField
							styles={classNames.subComponentStyles.textField}
							value={state.endOnInputValue}
							disabled={!state.endOn}
							onChange={handleEndOnInputChange}
							onBlur={handleEndOnInputBlur}
						/>
					</Stack.Item>
				</Stack>
			</Stack>
		</Dialog>
	);
};
