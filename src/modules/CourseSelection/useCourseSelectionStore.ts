import React from "react"

import { CourseSelectionContext } from "./CourseSelection.context"

export const useCourseSelectionStore = () => React.useContext(CourseSelectionContext)
