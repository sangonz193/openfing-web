import { BehaviorSubject } from "rxjs"

export type InputType = "POINTER" | "TOUCH"

export class AuthStore {
	grant = new BehaviorSubject<
		| {
				token: string
				refreshToken: string
		  }
		| {
				token?: undefined
				refreshToken: string
		  }
		| undefined
	>(undefined)
}
