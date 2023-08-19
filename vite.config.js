import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig(() => {
	return {
		define: {
			APP_VERSION: JSON.stringify(process.env.npm_package_version),
		},
		plugins: [react(), svgr()],
	}
})
