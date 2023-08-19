import React from "react"

import { CourseClassPlayerStore } from "./CourseClassPlayer.store"

export const CourseClassPlayerContext = React.createContext<CourseClassPlayerStore>(
	null as unknown as CourseClassPlayerStore
)

const initStore = () => new CourseClassPlayerStore()

export const CourseClassPlayerProvider: React.FC = ({ children }) => (
	<CourseClassPlayerContext.Provider value={React.useState(initStore)[0]}>
		{children}
	</CourseClassPlayerContext.Provider>
)
