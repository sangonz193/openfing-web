import { useObservableStates } from "../../../../hooks/useObservableStates"
import { useCourseClassPlayerStore } from "../../../../modules/CourseClassPlayer"

export function useIsPlayerLoaded() {
	const { loaded } = useObservableStates(useCourseClassPlayerStore(), ["loaded"])
	return loaded
}
