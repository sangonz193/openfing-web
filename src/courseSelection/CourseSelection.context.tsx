import React from "react"

import { CourseSelectionStore } from "./CourseSelection.store"

export const CourseSelectionContext = React.createContext<CourseSelectionStore>(null as unknown as CourseSelectionStore)

const initStore = () => new CourseSelectionStore()

export const CourseSelectionProvider: React.FC = ({ children }) => (
	<CourseSelectionContext.Provider value={React.useState(initStore)[0]}>{children}</CourseSelectionContext.Provider>
)
