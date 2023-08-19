import React from "react"

import { CourseClassPlayerContext } from "./CourseClassPlayer.context"
import type { CourseClassPlayerStore } from "./CourseClassPlayer.store"

export const useCourseClassPlayerStore = (): CourseClassPlayerStore => React.useContext(CourseClassPlayerContext)
