import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogFooter } from "@fluentui/react/lib/Dialog";
import { Dropdown, IDropdownOption, ResponsiveMode } from "@fluentui/react/lib/Dropdown";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import React from "react";
import { downloadFromUrl } from "src/_utils/downloadFromUrl";
import { useObserveProperties } from "src/hooks/useObserveProperties";

import { useCourseSelectionStore } from "../../modules/CourseSelection";
import { useCourseClassByIdQuery } from "./CourseClassDownloadModal.graphql.generated";
import { CourseClassDownloadModalProps } from "./CourseClassDownloadModal.types";

export const CourseClassDownloadModalBase = (props: CourseClassDownloadModalProps) => {
	const { selection } = useObserveProperties(useCourseSelectionStore(), ["selection"]);
	const { courseClassId } = selection;

	const [dismissed, setDismissed] = React.useState(!props.visible);

	React.useEffect(() => {
		if (props.visible) setDismissed(false);
	}, [props.visible]);

	const courseClassResponse = useCourseClassByIdQuery({
		skip: !courseClassId || dismissed,
		variables: courseClassId
			? {
					id: courseClassId,
			  }
			: undefined,
	});

	const { videos } =
		(courseClassResponse.data?.courseClassById.__typename === "CourseClass" &&
			courseClassResponse.data?.courseClassById) ||
		{};
	const quality =
		(videos && videos.length > 0 && videos[0].qualities.length > 0 && videos[0].qualities[0]) || undefined;

	const [selectedFormatId, setSelectedFormatId] = React.useState<string>();

	const dropdownOptions = React.useMemo<IDropdownOption[]>(() => {
		const res: IDropdownOption[] = [];

		quality?.formats.forEach((f) => {
			if (!f.name || !f.url) return;

			const option = {
				key: f.id,
				text: (f.name || "") + (f.hasTorrent ? ` (torrent)` : ""),
			};

			if (f.hasTorrent) res.unshift(option);
			else res.push(option);
		});

		return res.slice(0, 1);
	}, [quality?.formats, quality?.formats.length && quality.formats[0].hasTorrent]);

	React.useEffect(() => {
		if (
			dropdownOptions.length > 0 &&
			(!selectedFormatId || !dropdownOptions.find((i) => i.key === selectedFormatId))
		)
			setSelectedFormatId(dropdownOptions[0].key as string);
	}, [dropdownOptions]);

	const handleDownload = React.useCallback(() => {
		if (!selectedFormatId) return;

		const selectedFormat = quality?.formats.find((f) => f.id === selectedFormatId);

		if (selectedFormat?.url) downloadFromUrl(selectedFormat.url + (selectedFormat.hasTorrent ? ".torrent" : ""));
	}, [selectedFormatId, quality?.formats]);

	return (
		<Dialog
			hidden={!props.visible}
			dialogContentProps={{
				title: "Descargar",
				showCloseButton: true,
				onDismiss: props.onClose,
			}}
			modalProps={{
				onDismiss: props.onClose,
			}}
		>
			{courseClassResponse.loading ? (
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
	);
};
