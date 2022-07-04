import React from "react"

import { CourseSearchStore } from "./CourseSearch.store"

export const CourseSearchContext = React.createContext<CourseSearchStore>(null as unknown as CourseSearchStore)

const initStore = () => new CourseSearchStore()

export const CourseSearchProvider: React.FC = ({ children }) => (
	<CourseSearchContext.Provider value={React.useState(initStore)[0]}>{children}</CourseSearchContext.Provider>
)
