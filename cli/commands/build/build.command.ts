import { spawn } from "promisify-child-process"

import { projectPath } from "../../_utils/projectPath"
import { createCommand } from "../_utils/createCommand"

const command = createCommand({
	command: "build",

	describe: "Bundles the app to be deployed",

	handler: async () => {
		await spawn("npx", ["react-scripts", "build"], {
			stdio: "inherit",
			cwd: projectPath,
			env: {
				...process.env,
				SKIP_PREFLIGHT_CHECK: "true",
			},
		})
	},
})

export default command
