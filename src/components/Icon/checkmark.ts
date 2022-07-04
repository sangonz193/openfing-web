import { registerIconAlias } from "@fluentui/react"

import { CHECKMARK_OUTLINE_ICON_NAME } from "./checkmark-outline.generated"

export function registerCheckmarkIcon() {
	registerIconAlias("Checkmark", CHECKMARK_OUTLINE_ICON_NAME)
}
