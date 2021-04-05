import React from "react"

import { listenVar } from "../../_utils/listenVar"
import { getTeachingStorageKeyByTeachingKey } from "./getTeachingStorageKeyByTeachingKey"
import { teachingLocalStorage } from "./Teaching.storage"
import { TeachingKey, TeachingStatus } from "./Teaching.store"
import { useTeachingStore } from "./useTeachingStore"

export const useTeachingKeyStatus = (
	teachingKey: TeachingKey,
	canHandle = true
): [status: TeachingStatus | undefined, handleDismiss: () => void] => {
	const store = useTeachingStore()
	const getStatus = () => store.teachingStatusByKey()[teachingKey]

	const [status, setStatus] = React.useState(getStatus)

	React.useEffect(
		() =>
			listenVar(store.teachingStatusByKey, () => {
				const newStatus = getStatus()

				if (status !== newStatus) {
					setStatus(newStatus)
				}
			}),
		[]
	)

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
