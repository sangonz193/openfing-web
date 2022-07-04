import { FocusZone, FocusZoneDirection, List, Stack } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React, { useState } from "react"

import { CreativeCommonsFooter } from "../../../../components/CreativeCommonsFooter"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { useGoogleAnalyticsPageView } from "../../../../modules/GoogleAnalytics/useGoogleAnalyticsPageView"
import { useHistory } from "../../../../modules/Navigation/useHistory"
import { useRootEventListener } from "../../../../modules/RootEventListeners"
import { loginRouteConfig } from "../../../login/login.route.config"
import { CreatePostFormWrapper } from "../CreatePostFormWrapper"
import { Post } from "../Post"
import type { PostFragmentFragment } from "../Post/Post.urqlGraphql.generated"
import { usePostsQuery } from "./Blog.urqlGraphql.generated"
import { useBlogLayoutOptions } from "./useBlogLayoutOptions"
import { useBlogStyles } from "./useBlogStyles"

export type BlogProps = {
	children?: undefined
	className?: string
}

const BlogComponent: React.FC<BlogProps> = ({ className }) => {
	const title = "Blog"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })

	const [showCreatePost, setShowCreatePost] = useState<boolean | PostFragmentFragment>(false)
	const [{ data }] = usePostsQuery()

	const history = useHistory()

	const styles = useBlogStyles({
		className,
	})
	useBlogLayoutOptions({
		title: title,
		styles,
		onCreatePost: React.useCallback(() => setShowCreatePost(true), []),
	})

	useRootEventListener(
		"onKeyDown",
		React.useCallback((event) => {
			if (event.defaultPrevented) {
				return
			}

			if (keyboardKey.getCode(event.key) === keyboardKey.l) {
				history.push(loginRouteConfig.path)
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
