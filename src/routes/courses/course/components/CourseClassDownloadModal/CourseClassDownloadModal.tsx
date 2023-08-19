import type { IDropdownOption } from "@fluentui/react"
import { Dialog, DialogFooter, Dropdown, PrimaryButton, ResponsiveMode, Spinner, SpinnerSize } from "@fluentui/react"
import React from "react"

import { downloadFromUrl } from "../../../../../browserAPI/downloadFromUrl"
// @ts-expect-error icon is used indirectly here.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CHEVRON_DOWN_OUTLINE_ICON_NAME } from "../../../../../components/Icon/chevron-down-outline.generated"
import { registerChevrondownIcon } from "../../../../../components/Icon/chevrondown"
// @ts-expect-error icon is used indirectly here.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CLOSE_OUTLINE_ICON_NAME } from "../../../../../components/Icon/close-outline.generated"
import { useCourseSelectionStore } from "../../../../../courseSelection"
import { useObservableStates } from "../../../../../hooks/useObservableStates"
import { useCourseClassByIdQuery } from "../CourseDetail/CourseDetail.urqlGraphql.generated"

registerChevrondownIcon()

export type CourseClassDownloadModalProps = {
	className?: string
	visible: Boolean
	onClose?: () => void
}

const CourseClassDownloadModalComponent: React.FC<CourseClassDownloadModalProps> = ({ visible, onClose }) => {
	const { selection } = useObservableStates(useCourseSelectionStore(), ["selection"])
	const { courseClassId } = selection

	const [dismissed, setDismissed] = React.useState(!visible)

	React.useEffect(() => {
		if (visible) {
			setDismissed(false)
		}
	}, [visible])

	const [courseClassResponse] = useCourseClassByIdQuery({
		pause: !courseClassId || dismissed,
		variables: courseClassId
			? {
					id: courseClassId,
			  }
			: undefined,
	})

	const { videos } =
		(courseClassResponse.data?.courseClassById.__typename === "CourseClass" &&
			courseClassResponse.data?.courseClassById) ||
		{}
	const quality =
		(videos && videos.length > 0 && videos[0].qualities.length > 0 && videos[0].qualities[0]) || undefined

	const [selectedFormatId, setSelectedFormatId] = React.useState<string>()

	const dropdownOptions = React.useMemo<IDropdownOption[]>(() => {
		const res: IDropdownOption[] = []

		quality?.formats.forEach((f) => {
			if (!f.name || !f.url) {
				return
			}

			const option = {
				key: f.id,
				text: (f.name || "") + (f.hasTorrent ? ` (torrent)` : ""),
			}

			if (f.hasTorrent) {
				res.unshift(option)
			} else {
				res.push(option)
			}
		})

		return res.slice(0, 1)
	}, [quality?.formats, quality?.formats.length && quality.formats[0].hasTorrent])

	React.useEffect(() => {
		if (
			dropdownOptions.length > 0 &&
			(!selectedFormatId || !dropdownOptions.find((i) => i.key === selectedFormatId))
		) {
			setSelectedFormatId(dropdownOptions[0].key as string)
		}
	}, [dropdownOptions])

	const handleDownload = React.useCallback(() => {
		if (!selectedFormatId) {
			return
		}

		const selectedFormat = quality?.formats.find((f) => f.id === selectedFormatId)

		if (selectedFormat?.url) {
			downloadFromUrl(selectedFormat.url + (selectedFormat.hasTorrent ? ".torrent" : ""))
		}
	}, [selectedFormatId, quality?.formats])

	return (
		<Dialog
			hidden={!visible}
			dialogContentProps={{
				title: "Descargar",
				showCloseButton: true,
				closeButtonAriaLabel: "Cerrar",
				onDismiss: onClose,
			}}
			modalProps={{
				onDismiss: onClose,
			}}
		>
			{courseClassResponse.fetching ? (
				<Spinner size={SpinnerSize.large} />
			) : (
				<>
					{quality && quality.formats.length > 0 && (
						<Dropdown
							disabled
							label="Formato"
							options={dropdownOptions}
							selectedKey={selectedFormatId}
							responsiveMode={ResponsiveMode.large}
							onChange={(_, option) => option && setSelectedFormatId(option.key as string)}
						/>
					)}

					<DialogFooter>
						<PrimaryButton onClick={handleDownload}>Descargar</PrimaryButton>
					</DialogFooter>
				</>
			)}
		</Dialog>
	)
}

export const CourseClassDownloadModal = React.memo(CourseClassDownloadModalComponent)
