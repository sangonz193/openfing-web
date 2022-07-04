import { registerIconAlias } from "@fluentui/style-utilities"

import { ELLIPSIS_HORIZONTAL_ICON_NAME } from "./ellipsis-horizontal.generated"

export function registerMoreIcon() {
	registerIconAlias("more", ELLIPSIS_HORIZONTAL_ICON_NAME)
}
