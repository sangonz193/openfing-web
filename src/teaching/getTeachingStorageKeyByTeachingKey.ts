import identity from "lodash/identity"

import type { TeachingLocalStorageKeyValue } from "./Teaching.storage"
import type { TeachingKey } from "./Teaching.store"

export const getTeachingStorageKeyByTeachingKey = (teachingKey: TeachingKey): keyof TeachingLocalStorageKeyValue =>
	identity<Record<TeachingKey, keyof TeachingLocalStorageKeyValue>>({
		"dark-theme": "darkTheme",
	})[teachingKey]
