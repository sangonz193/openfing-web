import { Image, Link, Stack, Text } from "@fluentui/react"
import React from "react"

import CCImage from "./CreativeCommons.svg"
import { useCreativeCommonsFooterStyles } from "./useCreativeCommonsFooterStyles"

export type CreativeCommonsFooterProps = {
	children?: undefined
	className?: string
}

const CreativeCommonsFooterComponent: React.FC<CreativeCommonsFooterProps> = ({ className }) => {
	const styles = useCreativeCommonsFooterStyles({
		className,
	})

	return (
		<Stack className={styles.wrapper}>
			<Link className={styles.imageContainer}>
				<Image className={styles.image} src={CCImage} alt="Licencia de Creative Commons" />
			</Link>

			<Text>
				Esta obra está bajo una{" "}
				<Link
					className={styles.link}
					rel="license"
					target="_blank"
					href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
				>
					licencia de Creative Commons Reconocimiento-NoComercial-SinObraDerivada 4.0 Internacional
				</Link>
				.
			</Text>
		</Stack>
	)
}

export const CreativeCommonsFooter = React.memo(CreativeCommonsFooterComponent)
