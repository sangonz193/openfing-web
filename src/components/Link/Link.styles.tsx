import { LinkStyleProps, LinkStyles } from "./Link.types";

export const getStyles = (props: LinkStyleProps): LinkStyles => {
	return {
		root: props.className,
	};
};
