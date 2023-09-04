import type { Meta, Story } from "@storybook/react"
import identity from "lodash/identity"

import { Blog } from "./Blog"

type StoryProps = Required<{}>

export default identity<Meta<StoryProps>>({
	title: "Blog",
	component: Blog,
	parameters: {
		controls: {
			include: Object.keys(
				identity<Record<keyof StoryProps, 0>>({
					label: 0,
					errorMessage: 0,
				})
			),
		},
	},
})

const Template: Story<StoryProps> = (props) => {
	return (
		<div style={{ maxWidth: 300 }}>
			<Blog {...props} />
		</div>
	)
}

export const Default = Template.bind({})
