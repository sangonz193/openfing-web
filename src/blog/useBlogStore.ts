import React from "react"

import { BlogContext } from "./Blog.context"
import type { BlogStore } from "./Blog.store"

export const useBlogStore = (): BlogStore => {
	const context = React.useContext(BlogContext)
	return context
}
