import React from "react"

import { getTeachingStorageKeyByTeachingKey } from "./getTeachingStorageKeyByTeachingKey"
import { teachingLocalStorage } from "./Teaching.storage"
import type { TeachingKey, TeachingStatus } from "./Teaching.store"
import { useTeachingStore } from "./useTeachingStore"

export const useTeachingKeyStatus = (
	teachingKey: TeachingKey,
	canHandle = true
): [status: TeachingStatus | undefined, handleDismiss: () => void] => {
	const store = useTeachingStore()
	const getStatus = () => store.teachingStatusByKey.getValue()[teachingKey]

	const [status, setStatus] = React.useState(getStatus)

	React.useEffect(() => {
		const subscription = store.teachingStatusByKey.subscribe(() => {
			const newStatus = getStatus()

			if (status !== newStatus) {
				setStatus(newStatus)
			}
		})

		return () => subscription.unsubscribe()
	}, [])

	React.useEffect(() => {
		if (!status) {
			return
		}

		if (canHandle && status === "waiting") {
			store.setStatusFor(teachingKey, "ready")
		} else if (status === "ready" && !canHandle) {
			store.setStatusFor(teachingKey, "waiting")
		}
	}, [canHandle, teachingKey, status])

	const handleDismiss = React.useCallback(() => {
		store.setStatusFor(teachingKey, "dismissed")
		teachingLocalStorage.setItem(getTeachingStorageKeyByTeachingKey(teachingKey), "dismissed")
	}, [teachingKey])

	return [status, handleDismiss]
}
