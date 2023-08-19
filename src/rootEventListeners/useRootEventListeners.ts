import { useObservableStates } from "../hooks/useObservableStates"
import { useRootEventListenersStore } from "./useRootEventListenersStore"

export const useRootEventListeners = () => {
	const store = useRootEventListenersStore()
	return useObservableStates(store, ["listeners"]).listeners
}
