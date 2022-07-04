import React from "react"

import { CourseSearchContext } from "./CourseSearch.context"

export const useCourseSearchStore = () => React.useContext(CourseSearchContext)
