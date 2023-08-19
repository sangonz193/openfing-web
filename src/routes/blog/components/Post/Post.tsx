import type { IDialogContentProps } from "@fluentui/react"
import {
	CommandBarButton,
	DefaultButton,
	Dialog,
	DialogFooter,
	DialogType,
	Image,
	Link,
	PrimaryButton,
	Stack,
	Text,
} from "@fluentui/react"
import { useBoolean } from "@fluentui/react-hooks"
import { isAfter, isSameDay } from "date-fns"
import React, { useCallback, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown/lib/ast-to-react"

import { useAuthStore } from "../../../../auth"
import { PENCIL_OUTLINE_ICON_NAME } from "../../../../components/Icon/pencil-outline.generated"
import { TRASH_OUTLINE_ICON_NAME } from "../../../../components/Icon/trash-outline.generated"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import { PostTimestamp } from "../PostTimestamp"
import type { PostFragmentFragment } from "./Post.urqlGraphql.generated"
import { useDeletePostMutation } from "./Post.urqlGraphql.generated"
import { usePostStyles } from "./usePostStyles"

export type PostProps = {
	children?: undefined
	className?: string
	post: PostFragmentFragment
	onEdit: (post: PostFragmentFragment) => void
}

const components: Pick<Components, "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a" | "p" | "img"> = {
	h1: (props) => <Text variant="xxLarge" styles={{ root: { marginTop: 20 } }} {...props} />,
	h2: (props) => <Text variant="xLarge" styles={{ root: { marginTop: 20 } }} {...props} />,
	h3: (props) => <Text variant="large" styles={{ root: { marginTop: 20 } }} {...props} />,
	h4: (props) => <Text variant="large" styles={{ root: { marginTop: 15 } }} {...props} />,
	h5: (props) => <Text variant="large" styles={{ root: { marginTop: 15 } }} {...props} />,
	h6: (props) => <Text variant="large" styles={{ root: { marginTop: 15 } }} {...props} />,
	a: (props) => <Link {...(props as any)} />,
	p: (props) => <Text variant="mediumPlus" styles={{ root: { marginTop: 5 } }} {...props} />,
	img: (props) => <Image {...(props as any)} />,
}

export const Post: React.FC<PostProps> = ({ post, className, onEdit }) => {
	const styles = usePostStyles({
		className: className,
		withPublishedAt: !!post.publishedAt,
	})

	const [{}, deletePost] = useDeletePostMutation()
	const publishedAt = useMemo(() => new Date(post.publishedAt), [post.publishedAt])
	const isSameOrAfterToday = isAfter(new Date(), publishedAt) || isSameDay(publishedAt, new Date())
	const [hideConfirmDelete, { toggle: toggleHideDialog, setTrue: closeConfirmDelete }] = useBoolean(true)

	const dialogContentProps = useMemo(() => {
		const dialogContentProps: IDialogContentProps = {
			type: DialogType.normal,
			title: "Eliminar post",
			closeButtonAriaLabel: "Cerrar",
			subText: "¿Está seguro de que desea borrar el post?",
		}

		return dialogContentProps
	}, [])

	const handleConfirmDelete = useCallback(async () => {
		await deletePost({
			id: post.id,
		})
		closeConfirmDelete()
	}, [closeConfirmDelete])

	const authStore = useAuthStore()
	const { grant } = useObservableStates(authStore, ["grant"])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Stack style={{ flex: 1 }}>
					<Text className={styles.title} variant="xxLarge">
						{post.title}
					</Text>

					<div className={styles.publishedAtContainer}>
						{post.publishedAt && <PostTimestamp date={publishedAt} className={styles.publishedAt} />}

						{(!post.publishedAt || !isSameOrAfterToday) && (
							<Text variant="medium" className={styles.draft}>
								Borrador
							</Text>
						)}
					</div>
				</Stack>

				{grant && (
					<>
						<CommandBarButton
							className={styles.editButton}
							iconProps={{ iconName: PENCIL_OUTLINE_ICON_NAME }}
							onClick={() => onEdit(post)}
						/>

						<CommandBarButton
							className={styles.editButton}
							iconProps={{ iconName: TRASH_OUTLINE_ICON_NAME }}
							onClick={toggleHideDialog}
						/>
					</>
				)}
			</div>

			<ReactMarkdown components={components}>{post.mdContent}</ReactMarkdown>

			<Dialog hidden={hideConfirmDelete} dialogContentProps={dialogContentProps}>
				<DialogFooter>
					<DefaultButton className={styles.deleteButton} onClick={handleConfirmDelete} text="Borrar" />
					<PrimaryButton onClick={toggleHideDialog} text="Cancelar" />
				</DialogFooter>
			</Dialog>
		</div>
	)
}
