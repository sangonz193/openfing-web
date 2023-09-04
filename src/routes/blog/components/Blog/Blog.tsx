import { FocusZone, FocusZoneDirection, List, Stack } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

import { CreativeCommonsFooter } from "../../../../components/creative-commons-footer"
import { useRootEventListener } from "../../../../rootEventListeners"
import { loginRouteConfig } from "../../../login/login.route.config"
import { CreatePostFormWrapper } from "../CreatePostFormWrapper"
import { Post } from "../Post"
import type { PostFragmentFragment } from "../Post/Post.urqlGraphql.generated"
import { usePostsQuery } from "./Blog.urqlGraphql.generated"
import { useBlogLayoutOptions } from "./useBlogLayoutOptions"
import { useBlogStyles } from "./useBlogStyles"

const BlogComponent: React.FC = () => {
	const [showCreatePost, setShowCreatePost] = useState<boolean | PostFragmentFragment>(false)
	const [{ data }] = usePostsQuery()

	const navigate = useNavigate()

	const styles = useBlogStyles()
	useBlogLayoutOptions({
		styles,
		onCreatePost: useCallback(() => setShowCreatePost(true), []),
	})

	useRootEventListener(
		"onKeyDown",
		React.useCallback((event) => {
			if (event.defaultPrevented) {
				return
			}

			if (keyboardKey.getCode(event.key) === keyboardKey.l) {
				navigate(loginRouteConfig.path)
				event.preventDefault()
			}
		}, [])
	)

	const getKey = React.useCallback((item?: PostFragmentFragment) => item?.id ?? "", [])
	const handleRenderCell = React.useCallback((item?: PostFragmentFragment, index?: number) => {
		return item && typeof index === "number" ? (
			<React.Suspense fallback={null}>
				<Post post={item} onEdit={setShowCreatePost} />
			</React.Suspense>
		) : null
	}, [])

	return (
		<>
			<Stack className={styles.wrapper} disableShrink>
				<FocusZone direction={FocusZoneDirection.vertical} className={styles.content}>
					<List items={data?.posts} ignoreScrollingState getKey={getKey} onRenderCell={handleRenderCell} />
				</FocusZone>

				<CreativeCommonsFooter />
			</Stack>

			{showCreatePost && (
				<CreatePostFormWrapper
					initialData={showCreatePost !== true ? showCreatePost : undefined}
					open={!!showCreatePost}
					onClose={() => setShowCreatePost(false)}
				/>
			)}
		</>
	)
}

export const Blog = React.memo(BlogComponent)
