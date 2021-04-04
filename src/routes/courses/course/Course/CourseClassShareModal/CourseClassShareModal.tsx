import {
	Checkbox,
	ContextualMenu,
	Dialog,
	ITextFieldProps,
	MessageBar,
	MessageBarType,
	PrimaryButton,
	Stack,
	TextField,
} from "@fluentui/react"
import pick from "lodash/pick"
import React from "react"

import { copyToClipboard } from "../../../../../_utils/copyToClipboard"
import { CANCEL_ICON_NAME } from "../../../../../components/Icon/Cancel.icon"
import { CHECKMARK_CIRCLE_ICON_NAME } from "../../../../../components/Icon/CheckmarkCircle.icon"
import { COPY_ICON_NAME } from "../../../../../components/Icon/Copy.icon"
import { appConfig } from "../../../../../config/app.config"
import { useReactiveVars } from "../../../../../hooks/useReactiveVars"
import { useCourseClassPlayerStore } from "../../../../../modules/CourseClassPlayer"
import { useCourseSelectionStore } from "../../../../../modules/CourseSelection"
import { courseRouteConfig, CourseRouteConfigGetPathParams } from "../../course.route.config"
import { useCourseClassByIdQuery } from "./CourseClassShareModal.graphql.generated"
import { courseClassShareModalReducer, initCourseClassShareModalReducer } from "./CourseClassShareModal.reducer"
import { useCourseClassShareModalStyles } from "./useCourseClassShareModalStyles"

export type CourseClassShareModalProps = {
	children?: undefined
	visible: Boolean
	onClose?: () => void
}

const CourseClassShareModalComponent: React.FC<CourseClassShareModalProps> = ({ visible, onClose }) => {
	const styles = useCourseClassShareModalStyles({})
	const [state, dispatch] = React.useReducer(courseClassShareModalReducer, undefined, () =>
		initCourseClassShareModalReducer({
			seconds: 0,
			courseClassListCode: undefined,
			courseClassNo: undefined,
		})
	)
	const [successfulMessageVisible, setSuccessfulMessageVisible] = React.useState(false)

	const courseClassId = useReactiveVars(useCourseSelectionStore(), ["selection"]).selection.courseClassId
	const courseClassListResponse = useCourseClassByIdQuery({
		skip: !courseClassId,
		variables: courseClassId
			? {
					id: courseClassId,
			  }
			: undefined,
	})

	const courseClassPlayerStore = useCourseClassPlayerStore()
	const courseClass =
		courseClassListResponse.data?.courseClassById.__typename === "CourseClass"
			? courseClassListResponse.data.courseClassById
			: undefined
	React.useEffect(() => {
		if (visible) {
			if (courseClass?.courseClassList?.code && courseClass.number) {
				dispatch({
					type: "reset",
					courseClassListCode: courseClass.courseClassList.code,
					courseClassNo: courseClass.number,
					seconds: courseClassPlayerStore.currentTime(),
				})
			} else {
				dispatch({ type: "reset", courseClassListCode: undefined, courseClassNo: undefined, seconds: 0 })
			}

			setSuccessfulMessageVisible(false)
		}
	}, [visible, courseClass])

	const url = React.useMemo(() => {
		const { courseClassListCode, courseClassNo, startOnSeconds, endOnSeconds } = state

		if (!courseClassListCode || !courseClassNo) {
			return ""
		}

		let getPathParams: CourseRouteConfigGetPathParams = {
			code: courseClassListCode,
			courseClassNumber: courseClassNo,
		}

		if (state.startOn && typeof getPathParams.courseClassNumber === "number") {
			getPathParams = {
				...getPathParams,
				courseClassNumber: getPathParams.courseClassNumber,
				startOnSeconds: startOnSeconds,
				endOnSeconds: state.endOn ? endOnSeconds : undefined,
			}
		}

		return appConfig.baseUrl + courseRouteConfig.path(getPathParams)
	}, Object.values(pick(state, ["courseClassListCode", "courseClassNo", "startOn", "startOnSeconds", "endOn", "endOnSeconds"])))

	const handleCopy = React.useCallback(() => {
		copyToClipboard(url)
		setSuccessfulMessageVisible(true)
	}, [url])

	const handleStartOnCheckboxChange = React.useCallback(() => dispatch({ type: "toggle-start-on" }), [])

	const handleStartOnInputChange = React.useCallback<Required<ITextFieldProps>["onChange"]>((_, value) => {
		if (typeof value === "string") {
			dispatch({ type: "update-start-on-input-value", value })
		}
	}, [])
	const handleStartOnInputBlur = React.useCallback<Required<ITextFieldProps>["onBlur"]>(() => {
		dispatch({ type: "calculate-url" })
	}, [])

	const handleEndOnCheckboxChange = React.useCallback(() => dispatch({ type: "toggle-end-on" }), [])

	const handleEndOnInputChange = React.useCallback<Required<ITextFieldProps>["onChange"]>((_, value) => {
		if (typeof value === "string") {
			dispatch({ type: "update-end-on-input-value", value })
		}
	}, [])
	const handleEndOnInputBlur = React.useCallback<Required<ITextFieldProps>["onBlur"]>(() => {
		dispatch({ type: "calculate-url" })
	}, [])

	return (
		<Dialog
			hidden={!visible}
			dialogContentProps={{
				title: "Compartir",
				showCloseButton: true,
			}}
			modalProps={{
				isModeless: true,
				dragOptions: { closeMenuItemText: "Cerrar", moveMenuItemText: "Mover", menu: ContextualMenu },
				onDismiss: onClose,
			}}
			onDismiss={onClose}
		>
			<Stack tokens={{ childrenGap: 20 }}>
				<Stack horizontal>
					<Stack.Item grow={1}>
						<TextField className={styles.urlTextField} value={url} readOnly />
					</Stack.Item>

					<Stack.Item grow={0} shrink={0}>
						<PrimaryButton
							title="Copiar"
							iconProps={{ iconName: COPY_ICON_NAME }}
							className={styles.copyButton}
							onClick={handleCopy}
						/>
					</Stack.Item>
				</Stack>

				{successfulMessageVisible && (
					<MessageBar
						messageBarType={MessageBarType.success}
						messageBarIconProps={{ iconName: CHECKMARK_CIRCLE_ICON_NAME }}
						dismissIconProps={{
							className: styles.messageBarDismissIcon,
							iconName: CANCEL_ICON_NAME,
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
							className={styles.textField}
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
							className={styles.textField}
							value={state.endOnInputValue}
							disabled={!state.endOn}
							onChange={handleEndOnInputChange}
							onBlur={handleEndOnInputBlur}
						/>
					</Stack.Item>
				</Stack>
			</Stack>
		</Dialog>
	)
}

export const CourseClassShareModal = React.memo(CourseClassShareModalComponent)
