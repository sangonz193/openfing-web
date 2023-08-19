import { BehaviorSubject } from "rxjs"

export type InputType = "POINTER" | "TOUCH"

export class AppStore {
	inputType = new BehaviorSubject<InputType>("POINTER")
	isFocused = new BehaviorSubject<boolean>(true)
	isFocusVisible = new BehaviorSubject<boolean>(false)
}
