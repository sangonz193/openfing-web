import type { Meta, Story } from "@storybook/react"
import identity from "lodash/identity"

import { ApolloProvider } from "../../../../graphql/ApolloProvider"
import { LoginForm } from "./LoginForm"

type StoryProps = {}

export default identity<Meta<StoryProps>>({
	title: "LoginForm",
	component: LoginForm,
	argTypes: {},
	parameters: {
		controls: {
			include: [],
		},
	},
})

const Template: Story<StoryProps> = (props) => {
	return (
		<ApolloProvider>
			<LoginForm {...props} />
		</ApolloProvider>
	)
}

export const Default = Template.bind({})
