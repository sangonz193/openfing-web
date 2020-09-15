import FuzzySearch from "fuzzy-search";
import { action, computed, observable } from "mobx";

import { CourseFragment_CourseSearchFragment } from "./CourseSearch.graphql.generated";

export class CourseSearchStore {
	@observable source: CourseFragment_CourseSearchFragment[] = [];
	@observable searchValue: string = "";

	@action setSource(source: CourseFragment_CourseSearchFragment[]) {
		this.source = source;
	}

	@action setSearchValue(searchValue: string) {
		this.searchValue = searchValue;
	}

	@computed get searchResults() {
		return this.searcher.search(
			this.searchValue
				.toLowerCase()
				.replace(/á/g, "a")
				.replace(/é/g, "e")
				.replace(/í/g, "i")
				.replace(/ó/g, "o")
				.replace(/ú/g, "u")
		);
	}

	@computed private get searcher() {
		return new FuzzySearch(
			this.source.map((c) => ({
				id: c.id,
				code: c.code,
				name: c.name
					.toLowerCase()
					.replace(/á/g, "a")
					.replace(/é/g, "e")
					.replace(/í/g, "i")
					.replace(/ó/g, "o")
					.replace(/ú/g, "u"),
			})) || [],
			["code", "name"],
			{
				sort: true,
			}
		);
	}
}
