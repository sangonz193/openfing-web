import identity from "lodash/identity";
import { runInAction } from "mobx";
import React from "react";

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { wait } from "../../_utils/wait";
import { useBlockInitialization } from "../Initialization";
import { getTeachingStorageKeyByTeachingKey } from "./getTeachingStorageKeyByTeachingKey";
import { migrateTeachingLocalStorage, teachingLocalStorage } from "./Teaching.storage";
import { TeachingKey } from "./Teaching.store";
import { useTeachingStore } from "./useTeachingStore";

export const TeachingManager: React.FC = () => {
	const store = useTeachingStore();
	const unblockInitialization = useBlockInitialization();

	const didRanRef = React.useRef(false);
	React.useEffect(() => {
		if (didRanRef.current) return;
		didRanRef.current = true;

		const teachingKeys = dangerousKeysOf(
			identity<Record<TeachingKey, 0>>({
				"dark-theme": 0,
			})
		);

		(async () => {
			await migrateTeachingLocalStorage();
			const teachingKeyLocalStorageStatusMap = (
				await Promise.all(
					teachingKeys.map(async (teachingKey) => ({
						teachingKey,
						storageStatus: await teachingLocalStorage.getItem(
							getTeachingStorageKeyByTeachingKey(teachingKey)
						),
					}))
				)
			).reduce<Record<TeachingKey, "dismissed" | null>>(
				(res, value) => ({ ...res, [value.teachingKey]: value.storageStatus }),
				{} as Record<TeachingKey, "dismissed" | null>
			);

			await wait(1000);

			runInAction(() => {
				dangerousKeysOf(teachingKeyLocalStorageStatusMap).forEach((key) => {
					store.setStatusFor(
						key,
						teachingKeyLocalStorageStatusMap[key] === "dismissed" ? "dismissed" : "waiting"
					);
				});
			});

			unblockInitialization();
		})();
	}, []);

	return null;
};
