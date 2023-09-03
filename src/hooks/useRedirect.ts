import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function useRedirect(to: string, skip: boolean = false) {
	const navigate = useNavigate()

	useEffect(() => {
		if (skip) {
			return
		}

		navigate(to, { replace: true })
	}, [skip])
}
