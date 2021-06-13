import type React from "react"

import { useRedirect } from "../hooks/useRedirect"

export type RedirectProps = {
	to: string
}

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
	useRedirect(to)
	return null
}
