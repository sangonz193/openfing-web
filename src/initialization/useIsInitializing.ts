import { useObservableStates } from "../hooks/useObservableStates"
import { useInitializationStore } from "./useInitializationStore"

export const useIsInitializing = () => {
	const store = useInitializationStore()
	return useObservableStates(store, ["initializing"]).initializing
}
