import { action, observable } from "mobx";

export type InputType = "POINTER" | "TOUCH";

export class AppStore {
	@observable inputType: InputType = "POINTER";
	@observable isFocused = true;
	@observable isFocusVisible = false;

	@action setInputType(inputType: InputType) {
		this.inputType = inputType;
	}

	@action setIsFocused(isFocused: boolean) {
		this.isFocused = isFocused;
	}

	@action setIsFocusVisible(isVisible: boolean) {
		this.isFocusVisible = isVisible;
	}
}
