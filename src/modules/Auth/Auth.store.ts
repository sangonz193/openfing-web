import { makeVar } from "@apollo/client"

export type InputType = "POINTER" | "TOUCH"

export class AuthStore {
	data =
		makeVar<
			| {
					accessToken: string
					refreshToken: string
					idToken: string
			  }
			| undefined
		>(undefined)
}
