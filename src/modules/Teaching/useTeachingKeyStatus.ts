import React from "react";

import { getTeachingStorageKeyByTeachingKey } from "./getTeachingStorageKeyByTeachingKey";
import { teachingLocalStorage } from "./Teaching.storage";
import { TeachingKey, TeachingStatus } from "./Teaching.store";
import { useTeachingStore } from "./useTeachingStore";

export const useTeachingKeyStatus = (
	teachingKey: TeachingKey,
	canHandle = true
): [status: TeachingStatus | undefined, handleDismiss: () => void] => {
	const store = useTeachingStore();
	const currentStatus = store.teachingStatusByKey.get(teachingKey);

	React.useEffect(() => {
		if (!currentStatus) return;

		if (canHandle && currentStatus === "waiting") store.setStatusFor(teachingKey, "ready");
		else if (currentStatus === "ready" && !canHandle) store.setStatusFor(teachingKey, "waiting");
	}, [canHandle, teachingKey, currentStatus]);

	const handleDismiss = React.useCallback(() => {
		store.setStatusFor(teachingKey, "dismissed");
		teachingLocalStorage.setItem(getTeachingStorageKeyByTeachingKey(teachingKey), "dismissed");
	}, [teachingKey]);

	return [currentStatus, handleDismiss];
};
