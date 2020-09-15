import { action, computed, observable } from "mobx";

export class InitializationStore {
	@observable blockers = 0;

	@observable resetCallbacks: Array<() => void> = [];

	@observable childrenKey = false;

	@computed get initializating() {
		return this.blockers > 0;
	}

	@action block() {
		this.blockers++;
	}

	@action unblock() {
		this.blockers--;
	}

	@action reset() {
		const { resetCallbacks } = this;

		this.childrenKey = !this.childrenKey;

		this.resetCallbacks = [];
		resetCallbacks.forEach((callback) => callback());
	}

	@action addResetListener(listener: () => void) {
		this.resetCallbacks.push(listener);
	}

	@action removeResetListener(listener: () => void) {
		const indexOf = this.resetCallbacks.indexOf(listener);

		if (indexOf >= 0) this.resetCallbacks.splice(indexOf, 1);
	}
}
