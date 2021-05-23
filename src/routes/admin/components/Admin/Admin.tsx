import React, { useCallback } from "react"

import { useReactiveVars } from "../../../../hooks/useReactiveVars"
import { useAppStore } from "../../../../modules/App"
import { useHistory } from "../../../../modules/Navigation/useHistory"
import { coursesRouteConfig } from "../../../courses/courses.route.config"
import { AdminSecret } from "../AdminSecret"

export type AdminProps = {
	children?: undefined
}

const AdminComponent: React.FC<AdminProps> = ({}) => {
	const appStore = useAppStore()
	const history = useHistory()
	const { secret } = useReactiveVars(appStore, ["secret"])

	const handleSuccess = useCallback((secret: string) => {
		appStore.secret(secret)
	}, [])

	React.useEffect(() => {
		if (secret) {
			history.push(coursesRouteConfig.path)
		}
	}, [secret])

	return secret ? null : <AdminSecret onSuccess={handleSuccess} />
}

export const Admin = React.memo(AdminComponent)
