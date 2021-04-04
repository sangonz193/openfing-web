import { createTypedStorage } from "../../storage/createTypedStorage"

export type CourseClassPlayerLocalStorageKeyValue = {
	pinCourseClassList: boolean
}

export const courseClassPlayerLocalStorage = createTypedStorage<CourseClassPlayerLocalStorageKeyValue>({
	scope: "courseClassPlayer",

	sessionStorage: false,

	serializers: {
		pinCourseClassList: ({ value }) => value.toString(),
	},

	deserializers: {
		pinCourseClassList: ({ storageValue }) => storageValue !== "false",
	},

	keyKeys: {
		pinCourseClassList: 0,
	},
})

export const migrateCourseClassPlayerLocalStorage = async () => {}
