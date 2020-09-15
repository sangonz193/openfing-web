import { styled } from "@fluentui/react/lib/Utilities";

import { UpdatesBase } from "./Updates.base";
import { getStyles } from "./Updates.styles";
import { UpdatesProps, UpdatesStyleProps, UpdatesStyles } from "./Updates.types";

export const Updates = styled<UpdatesProps, UpdatesStyleProps, UpdatesStyles>(
	UpdatesBase,
	getStyles,
	undefined,
	undefined,
	true
);
