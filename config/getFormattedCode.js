const prettier = require("prettier")
const prettierrc = require("../prettier.config")

module.exports = {
	/**
	 * @param {string} code
	 * @param {Partial<prettier.Options>} [options]
	 */
	getFormattedCode(code, options) {
		return prettier.format(code, {
			parser: "typescript",
			...prettierrc,
			...options,
		})
	},

	/**
	 * @param {string} json
	 * @param {Partial<prettier.Options>} [options]
	 */
	getFormattedJson(json, options) {
		return prettier.format(json, {
			parser: "json",
			...prettierrc,
			...options,
		})
	},
}
