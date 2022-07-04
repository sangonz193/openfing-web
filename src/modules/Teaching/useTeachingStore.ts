import React from "react"

import { TeachingContext } from "./Teaching.context"

export const useTeachingStore = () => React.useContext(TeachingContext)
