import { hasProperty } from "@sangonz193/utils/hasProperty"

// TODO: rename?
export const getCreatedCourseFromCacheHack = (
	cache: unknown,
	courseCode: string
): { code: string; name: string } | null => {
	if (typeof cache !== "object" || !cache) {
		return null
	}

	const courseCacheKeys = Object.keys(cache).filter((key) =>
		typeof key === "string" ? key.startsWith("Course:") : false
	)

	for (const courseCacheKey of courseCacheKeys) {
		const courseCacheValue = cache[courseCacheKey as keyof typeof cache] as unknown

		if (
			courseCacheValue &&
			typeof courseCacheValue === "object" &&
			hasProperty(courseCacheValue, "code") &&
			typeof courseCacheValue.code === "string" &&
			courseCacheValue.code === courseCode &&
			hasProperty(courseCacheValue, "name") &&
			typeof courseCacheValue.name === "string"
		) {
			const { code, name } = courseCacheValue
			return {
				code,
				name,
			}
		}
	}

	return null
}
