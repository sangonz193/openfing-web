import React from "react"

import { useRefWithInitializer } from "../hooks/useRefWithInitializer"
import { BlogStore } from "./Blog.store"

export type BlogContextValue = BlogStore

export const BlogContext = React.createContext<BlogContextValue>(null as unknown as BlogContextValue)

export const BlogProvider: React.FC = ({ children }) => {
	const store = useRefWithInitializer(() => new BlogStore())

	return <BlogContext.Provider value={store.current}>{children}</BlogContext.Provider>
}
