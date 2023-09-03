import type { ITextFieldProps } from "@fluentui/react"
import {
	Checkbox,
	ContextualMenu,
	Dialog,
	MessageBar,
	MessageBarType,
	PrimaryButton,
	Stack,
	TextField,
} from "@fluentui/react"
import pick from "lodash/pick"
import React from "react"

import { appConfig } from "../../../../../app.config"
import { copyToClipboard } from "../../../../../browserAPI/copyToClipboard"
import { registerCheckmarkIcon } from "../../../../../components/Icon/checkmark"
import { CHECKMARK_CIRCLE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/checkmark-circle-outline.generated"
import { CLOSE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/close-outline.generated"
import { COPY_OUTLINE_ICON_NAME } from "../../../../../components/Icon/copy-outline.generated"
import { useCourseClassPlayerStore } from "../../../../../courseClassPlayer"
import { useCourseSelectionStore } from "../../../../../courseSelection"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import type { CourseRouteConfigGetPathParams } from "../../course.route.config"
import { getCoursePath } from "../../course.route.config"
import { courseClassShareModalReducer, initCourseClassShareModalReducer } from "./CourseClassShareModal.reducer"
import { useCourseClassByIdQuery } from "./CourseClassShareModal.urqlGraphql.generated"
import { useCourseClassShareModalStyles } from "./useCourseClassShareModalStyles"

registerCheckmarkIcon()

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

	const courseClassId = useObservableStates(useCourseSelectionStore(), ["selection"]).selection.courseClassId
	const [courseClassListResponse] = useCourseClassByIdQuery({
		pause: !courseClassId,
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
	const courseClassListCode = courseClass?.courseClassList?.code
	React.useEffect(() => {
		if (!visible) {
			return
		}

		if (courseClassListCode && courseClass?.number) {
			dispatch({
				type: "reset",
				courseClassListCode: courseClassListCode,
				courseClassNo: courseClass.number,
				seconds: courseClassPlayerStore.currentTime.getValue(),
			})
		} else {
			dispatch({ type: "reset", courseClassListCode: undefined, courseClassNo: undefined, seconds: 0 })
		}

		setSuccessfulMessageVisible(false)
	}, [visible, courseClass?.number, courseClassListCode])

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

		return appConfig.baseUrl + getCoursePath(getPathParams)
	}, [
		...Object.values(
			pick(state, ["courseClassListCode", "courseClassNo", "startOn", "startOnSeconds", "endOn", "endOnSeconds"])
		),
		courseClass?.courseClassList?.code,
	])
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

	const showTimeInputs = !courseClass?.liveState

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
							iconProps={{ iconName: COPY_OUTLINE_ICON_NAME }}
							className={styles.copyButton}
							onClick={handleCopy}
						/>
					</Stack.Item>
				</Stack>

				{successfulMessageVisible && (
					<MessageBar
						messageBarType={MessageBarType.success}
						messageBarIconProps={{ iconName: CHECKMARK_CIRCLE_OUTLINE_ICON_NAME }}
						dismissIconProps={{
							className: styles.messageBarDismissIcon,
							iconName: CLOSE_OUTLINE_ICON_NAME,
						}}
						onDismiss={() => setSuccessfulMessageVisible(false)}
					>
						Copiado
					</MessageBar>
				)}

				{showTimeInputs && (
					<>
						<Stack tokens={{ childrenGap: 10 }} verticalAlign="center">
							<Stack.Item grow={0} shrink={0}>
								<Checkbox
									label="Iniciar en: "
									checked={state.startOn}
									onChange={handleStartOnCheckboxChange}
								/>
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
					</>
				)}
			</Stack>
		</Dialog>
	)
}

export const CourseClassShareModal = React.memo(CourseClassShareModalComponent)
