import { makeVar } from "@apollo/client"
import FuzzySearch from "fuzzy-search"

import { listenVar } from "../../_utils/listenVar"
import type { CourseFragment_CourseSearchFragment } from "./CourseSearch.graphql.generated"

export class CourseSearchStore {
	source = makeVar<CourseFragment_CourseSearchFragment[]>([])
	searchValue = makeVar<string>("")
	searchResults = makeVar<CourseFragment_CourseSearchFragment[]>([])

	protected listeners: Array<() => void> = []

	constructor() {
		this.listeners.push(listenVar(this.source, this.updateSearchResults))
		this.listeners.push(listenVar(this.searchValue, this.updateSearchResults))
	}

	dispose() {
		this.listeners.forEach((listener) => listener())
	}

	protected getSearcher() {
		return new FuzzySearch(
			this.source().map((course) => ({
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
		this.searchResults(
			searcher.search(
				this.searchValue()
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
