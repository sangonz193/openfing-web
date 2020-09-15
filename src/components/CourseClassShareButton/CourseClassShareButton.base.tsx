import { CommandBarButton } from "@fluentui/react/lib/Button";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import { CourseClassShareModal } from "../CourseClassShareModal";
import {
	CourseClassShareButtonProps,
	CourseClassShareButtonStyleProps,
	CourseClassShareButtonStyles,
} from "./CourseClassShareButton.types";

const getClassNames = classNamesFunction<CourseClassShareButtonStyleProps, CourseClassShareButtonStyles>();

export const CourseClassShareButtonBase = (props: CourseClassShareButtonProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const [modalVisible, setModalVisible] = React.useState(false);

	const handleClick = React.useCallback(() => setModalVisible(true), []);
	const handleClose = React.useCallback(() => setModalVisible(false), []);

	return (
		<>
			<CommandBarButton
				styles={classNames.subComponentStyles.commandButton()}
				iconProps={{ iconName: "ShareSocial" }}
				onClick={handleClick}
			>
				Compartir
			</CommandBarButton>

			<CourseClassShareModal visible={modalVisible} onClose={handleClose} />
		</>
	);
};
