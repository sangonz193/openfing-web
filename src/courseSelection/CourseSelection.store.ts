import { BehaviorSubject } from "rxjs"

import type {
	CourseSelectionCourseClassListByCodeWithClassesFragment,
	CourseSelectionCourseClassListByCodeWithIdFragment,
} from "./CourseSelection.urqlGraphql.generated"

export type CompleteCourseSelectionStoreSelection = {
	courseClassListId: string
	courseClassListCode: string
	courseClassId: string
	courseClassNumber: number
	videoId: string
	videoQualityId: string
	videoFormatId: string
}

export type EmptyCourseSelectionStoreSelection = Partial<CompleteCourseSelectionStoreSelection>

export type SelectedCourseClassListCourseSelectionStoreSelection =
	| (Omit<EmptyCourseSelectionStoreSelection, "courseClassListId"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassListId">)
	| (Omit<EmptyCourseSelectionStoreSelection, "courseClassListCode"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassListCode">)
	| (Omit<EmptyCourseSelectionStoreSelection, "courseClassListId" | "courseClassListCode"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassListId" | "courseClassListCode">)

export type SelectedCourseClassCourseSelectionStoreSelection =
	| (Omit<SelectedCourseClassListCourseSelectionStoreSelection, "courseClassId"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassId">)
	| (Omit<SelectedCourseClassListCourseSelectionStoreSelection, "courseClassNumber"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassNumber">)
	| (Omit<EmptyCourseSelectionStoreSelection, "courseClassId" | "courseClassNumber"> &
			Pick<CompleteCourseSelectionStoreSelection, "courseClassId" | "courseClassNumber">)

export type CourseSelectionStoreSelection =
	| EmptyCourseSelectionStoreSelection
	| SelectedCourseClassListCourseSelectionStoreSelection
	| SelectedCourseClassCourseSelectionStoreSelection
	| (Omit<SelectedCourseClassCourseSelectionStoreSelection, "videoId"> &
			Pick<CompleteCourseSelectionStoreSelection, "videoId">)
	| (Omit<SelectedCourseClassCourseSelectionStoreSelection, "videoId" | "videoQualityId"> &
			Pick<CompleteCourseSelectionStoreSelection, "videoId" | "videoQualityId">)
	| (Omit<SelectedCourseClassCourseSelectionStoreSelection, "videoId" | "videoQualityId" | "videoFormatId"> &
			Pick<CompleteCourseSelectionStoreSelection, "videoId" | "videoQualityId" | "videoFormatId">)

export class CourseSelectionStore {
	selection = new BehaviorSubject<CourseSelectionStoreSelection>({
		courseClassListId: undefined,
		courseClassListCode: undefined,
		courseClassId: undefined,
		courseClassNumber: undefined,
		videoId: undefined,
		videoQualityId: undefined,
		videoFormatId: undefined,
	})

	courseClassListByCodeWithId = new BehaviorSubject<CourseSelectionCourseClassListByCodeWithIdFragment | undefined>(
		undefined
	)
	courseClassListByCodeWithClasses = new BehaviorSubject<
		CourseSelectionCourseClassListByCodeWithClassesFragment | undefined
	>(undefined)
}
