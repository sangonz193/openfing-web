import React, { useCallback } from "react"

import { useHistory } from "../../../../modules/Navigation/useHistory"
import { coursesRouteConfig } from "../../../courses/courses.route.config"
import { AdminSecret } from "../AdminSecret"

export type AdminProps = {
	children?: undefined
}

const AdminComponent: React.FC<AdminProps> = ({}) => {
	const history = useHistory()
	const { secret } = { secret: undefined as string | undefined } // TODO: get isAdmin condition

	const handleSuccess = useCallback(() =>
		// secret: string
		{
			// appStore.secret(secret)
		}, [])

	React.useEffect(() => {
		if (secret) {
			history.push(coursesRouteConfig.path)
		}
	}, [secret])

	return secret ? null : <AdminSecret onSuccess={handleSuccess} />
}

export const Admin = React.memo(AdminComponent)
