/** @type {import("prettier").Options} */
module.exports = {
	plugins: ["prettier-plugin-tailwindcss"],
	tabWidth: 4,
	useTabs: true,
	printWidth: 120,
	trailingComma: "es5",
	semi: false,
	tailwindFunctions: ["clsx", "cn"],
}
