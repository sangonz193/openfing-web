import { Image } from "@fluentui/react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/cn"

import CCImage from "./CreativeCommons.svg"

type Props = {
	className?: string
}

export function CreativeCommonsFooter({ className }: Props) {
	return (
		<div
			className={cn(
				"mx-2 my-2 flex shrink-0 flex-col gap-2 rounded bg-card/50 p-4 md:flex-row md:items-center",
				className
			)}
		>
			<Image height={40} src={CCImage} alt="Licencia de Creative Commons" />

			<span className="shrink">
				Esta obra está bajo una{" "}
				<Link
					className="text-primary"
					rel="license"
					target="_blank"
					to="http://creativecommons.org/licenses/by-nc-nd/4.0/"
				>
					licencia de Creative Commons Reconocimiento-NoComercial-SinObraDerivada 4.0 Internacional
				</Link>
				.
			</span>
		</div>
	)
}
