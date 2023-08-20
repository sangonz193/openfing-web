import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import svgr from "vite-plugin-svgr"
import { z } from "zod"

export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd(), [""])

	const { PORT } = z
		.object({
			PORT: z.string().transform<number | undefined>((value) => {
				if (command === "build") {
					return undefined
				}

				const parsedValue = parseInt(value, 10)
				if (isNaN(parsedValue)) {
					throw new Error("PORT must be a number")
				}
				return parsedValue
			}),
		})
		.parse(env)

	return {
		server: {
			port: PORT,
		},
		define: {
			APP_VERSION: JSON.stringify(process.env.npm_package_version),
		},
		plugins: [react(), svgr(), legacy()],
		test: {
			environment: "jsdom",
			setupFiles: ["./src/setupTests.ts"],
		},
	}
})
