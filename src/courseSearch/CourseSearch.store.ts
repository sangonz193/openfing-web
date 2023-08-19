import FuzzySearch from "fuzzy-search"
import { BehaviorSubject, combineLatest } from "rxjs"

import type { CourseSearchCourseFragment } from "./CourseSearch.urqlGraphql.generated"

export class CourseSearchStore {
	source = new BehaviorSubject<CourseSearchCourseFragment[]>([])
	searchValue = new BehaviorSubject<string>("")
	searchResults = new BehaviorSubject<CourseSearchCourseFragment[]>([])

	protected listeners: Array<() => void> = []

	constructor() {
		const subscription = combineLatest([this.source, this.searchValue]).subscribe(() => this.updateSearchResults())
		this.listeners.push(() => subscription.unsubscribe())
	}

	dispose() {
		this.listeners.forEach((listener) => listener())
	}

	protected getSearcher() {
		return new FuzzySearch(
			this.source.getValue().map((course) => ({
				id: course.id,
				code: course.code,
				name: course.name
					.toLowerCase()
					.replace(/á/g, "a")
					.replace(/é/g, "e")
					.replace(/í/g, "i")
					.replace(/ó/g, "o")
					.replace(/ú/g, "u"),
			})),
			["code", "name"],
			{
				sort: true,
			}
		)
	}

	private updateSearchResults = () => {
		const searcher = this.getSearcher()
		this.searchResults.next(
			searcher.search(
				this.searchValue
					.getValue()
					.toLowerCase()
					.replace(/á/g, "a")
					.replace(/é/g, "e")
					.replace(/í/g, "i")
					.replace(/ó/g, "o")
					.replace(/ú/g, "u")
			)
		)
	}
}
