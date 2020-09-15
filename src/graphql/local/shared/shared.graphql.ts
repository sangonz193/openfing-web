import gql from "graphql-tag";

export const sharedTypeDefs = gql`
	directive @client on OBJECT | FIELD

	type Mutation {
		_: Void
	}
`;
