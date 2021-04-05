import { Image, Link, Text } from "@fluentui/react"
import React from "react"

import { Div } from "../Div"
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
		<Div className={styles.wrapper}>
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
		</Div>
	)
}

export const CreativeCommonsFooter = React.memo(CreativeCommonsFooterComponent)
