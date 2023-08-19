import { useCourseClassPlayerStore } from "../../../../courseClassPlayer"
import { useObservableStates } from "../../../../hooks/useObservableStates"

export function useIsPlayerLoaded() {
	const { loaded } = useObservableStates(useCourseClassPlayerStore(), ["loaded"])
	return loaded
}
