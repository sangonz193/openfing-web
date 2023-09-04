import type { ChildProcessPromise } from "promisify-child-process"
import { spawn } from "promisify-child-process"
import type { PluginOption } from "vite"

export function graphqlCodegen(command: "serve" | "build") {
	if (command === "build") {
		return [] satisfies PluginOption[]
	}

	let codegenProcess: ChildProcessPromise | undefined

	return [
		{
			name: "graphql-codegen",
			buildStart() {
				codegenProcess = spawn("npx", ["graphql-codegen", "--watch"], {
					stdio: "inherit",
				})
			},
			closeBundle() {
				codegenProcess?.kill()
			},
		},
	] satisfies PluginOption[]
}
