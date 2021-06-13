import type { Meta, Story } from "@storybook/react"
import identity from "lodash/identity"

import { ApolloProvider } from "../../../../graphql/ApolloProvider"
import { SignUpForm } from "./SignUpForm"

type StoryProps = {}

export default identity<Meta<StoryProps>>({
	title: "SignUpForm",
	component: SignUpForm,
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
			<SignUpForm {...props} />
		</ApolloProvider>
	)
}

export const Default = Template.bind({})
