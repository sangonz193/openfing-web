import type { ArgTypes } from "@storybook/react"

export type StorybookArgTypes<TStoryProps> = {
	[TStoryPropName in keyof TStoryProps]: Pick<ArgTypes[""], "name" | "description" | "defaultValue"> & {
		control: {
			type: "text"
		}
	}
}
