import { registerIconAlias } from "@fluentui/react"

import { CLOSE_OUTLINE_ICON_NAME } from "./close-outline.generated"

export function registerCancelIcon() {
	registerIconAlias("Cancel", CLOSE_OUTLINE_ICON_NAME)
}
