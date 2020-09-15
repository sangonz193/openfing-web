import { CommandBarButton } from "@fluentui/react/lib/Button";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { CourseClassDownloadModal } from "../CourseClassDownloadModal";
import {
	CourseClassDownloadButtonProps,
	CourseClassDownloadButtonStyleProps,
	CourseClassDownloadButtonStyles,
} from "./CourseClassDownloadButton.types";

const getClassNames = classNamesFunction<CourseClassDownloadButtonStyleProps, CourseClassDownloadButtonStyles>();

export const CourseClassDownloadButtonBase = (props: CourseClassDownloadButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const [modalVisible, setModalVisible] = React.useState(false);

	const handleClick = React.useCallback(() => setModalVisible(true), []);
	const handleClose = React.useCallback(() => setModalVisible(false), []);

	return (
		<>
			<CommandBarButton
				styles={classNames.subComponentStyles.commandButton()}
				iconProps={{ iconName: "Download" }}
				onClick={handleClick}
			>
				Descargar
			</CommandBarButton>

			<CourseClassDownloadModal visible={modalVisible} onClose={handleClose} />
		</>
	);
};
