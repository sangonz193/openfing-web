import React, { useCallback } from "react"

import { useReactiveVars } from "../../../../hooks/useReactiveVars"
import { useAuthStore } from "../../../../modules/Auth"
import { useHistory } from "../../../../modules/Navigation/useHistory"
import { coursesRouteConfig } from "../../../courses/courses.route.config"
import { AdminSecret } from "../AdminSecret"

export type AdminProps = {
	children?: undefined
}

const AdminComponent: React.FC<AdminProps> = ({}) => {
	const history = useHistory()
	const authStore = useAuthStore()
	const { secret } = useReactiveVars(authStore, ["secret"])

	const handleSuccess = useCallback((secret: string) => {
		authStore.secret(secret)
	}, [])

	React.useEffect(() => {
		if (secret) {
			history.push(coursesRouteConfig.path)
		}
	}, [secret])

	return secret ? null : <AdminSecret onSuccess={handleSuccess} />
}

export const Admin = React.memo(AdminComponent)
