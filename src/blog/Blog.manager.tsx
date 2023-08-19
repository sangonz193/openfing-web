import React, { useEffect, useState } from "react"

import { useAuthStore } from "../auth"
import { useObservableStates } from "../hooks/useObservableStates"
import { useBlockInitialization } from "../initialization"
import { usePostsQuery } from "../routes/blog/components/Blog/Blog.urqlGraphql.generated"
import { blogLocalStorage, migrateBlogLocalStorage } from "./Blog.storage"
import { useBlogStore } from "./useBlogStore"

export const BlogManager: React.FC = () => {
	const [persist, setPersist] = useState(false)
	const store = useBlogStore()
	const unblockInitialization = useBlockInitialization()

	const authStore = useAuthStore()
	const { grant } = useObservableStates(authStore, ["grant"])
	const [{ data }, fetchPosts] = usePostsQuery({
		requestPolicy: "cache-only",
	})

	React.useEffect(() => {
		;(async () => {
			await migrateBlogLocalStorage()

			const enabled = await blogLocalStorage.getItem("enabled")
			if (typeof enabled === "boolean") {
				store.enabled.next(enabled)
			}

			unblockInitialization()
			setPersist(true)
		})()
	}, [])

	useEffect(() => {
		fetchPosts({
			requestPolicy: "network-only",
		})
	}, [grant, fetchPosts])

	const { posts } = data || {}
	useEffect(() => {
		if (posts?.length) {
			store.enabled.next(true)
		}
	}, [posts?.length])

	return persist ? <PersistToStorage /> : null
}

const PersistToStorage = () => {
	const store = useBlogStore()
	const { enabled } = useObservableStates(store, ["enabled"])

	useEffect(() => {
		blogLocalStorage.setItem("enabled", enabled)
	}, [enabled])

	return null
}
