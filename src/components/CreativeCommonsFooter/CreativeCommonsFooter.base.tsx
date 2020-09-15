import { Image } from "@fluentui/react/lib/Image";
import { Link } from "@fluentui/react/lib/Link";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";

import CCImage from "./CreativeCommons.svg";
import {
	CreativeCommonsFooterProps,
	CreativeCommonsFooterStyleProps,
	CreativeCommonsFooterStyles,
} from "./CreativeCommonsFooter.types";

const getClassNames = classNamesFunction<CreativeCommonsFooterStyleProps, CreativeCommonsFooterStyles>();

export const CreativeCommonsFooterBase = (props: CreativeCommonsFooterProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	return (
		<div className={classNames.root}>
			<Link className={classNames.imageContainer}>
				<Image className={classNames.image} src={CCImage} alt="Licencia de Creative Commons" />
			</Link>

			<Text className={classNames.text}>
				Esta obra está bajo una{" "}
				<Link
					className={classNames.link}
					rel="license"
					target="_blank"
					href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
				>
					licencia de Creative Commons Reconocimiento-NoComercial-SinObraDerivada 4.0 Internacional
				</Link>
				.
			</Text>
		</div>
	);
};
