module.exports = {
	extends: ["plugin:@typescript-eslint/recommended", "prettier", "plugin:storybook/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		ecmaVersion: 10,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["simple-import-sort"],
	rules: {
		"@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-non-null-assertion": ["warn"],
		"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/prefer-interface": "off",
		"@typescript-eslint/restrict-plus-operands": "warn",
		"@typescript-eslint/restrict-template-expressions": "warn",
		"@typescript-eslint/switch-exhaustiveness-check": "error",
		"no-case-declarations": "error",
		"no-console": "off",
		"no-fallthrough": "error",
		"no-unused-vars": "off",
		"react/display-name": "off",
		"react/prop-types": "off",
		"simple-import-sort/imports": "warn",
		"simple-import-sort/exports": "warn",
		curly: ["warn", "all"],
		"@typescript-eslint/ban-ts-comment": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
