import type { CommandModule } from "yargs"

import { applyEnvVariables } from "../../_utils/applyEnvVariables"

export type CreateCommandOptions = {
	skipApplyEnv?: boolean
}

export function createCommand<T, U>(info: CommandModule<T, U>, options?: CreateCommandOptions): CommandModule<T, U> {
	if (!options?.skipApplyEnv) {
		const originalHandler = info.handler
		info.handler = async (args) => {
			await applyEnvVariables()
			return originalHandler(args)
		}
	}

	return info
}
