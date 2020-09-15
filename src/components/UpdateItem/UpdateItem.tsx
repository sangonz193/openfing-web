import { styled } from "@fluentui/react/lib/Utilities";

import { UpdateItemBase } from "./UpdateItem.base";
import { getStyles } from "./UpdateItem.styles";
import { UpdateItemProps, UpdateItemStyleProps, UpdateItemStyles } from "./UpdateItem.types";

export const UpdateItem = styled<UpdateItemProps, UpdateItemStyleProps, UpdateItemStyles>(
	UpdateItemBase,
	getStyles,
	undefined,
	undefined,
	true
);
