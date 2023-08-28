import * as prettier from "prettier"

import prettierrc from "../../prettier.config"

export const getFormattedCode = (code: string, options?: Partial<prettier.Options>): Promise<string> => {
	return prettier.format(code, {
		parser: "typescript",
		...(prettierrc as prettier.Options),
		...options,
	})
}

export const getFormattedJson = (json: string, options?: Partial<prettier.Options>): Promise<string> => {
	return prettier.format(json, {
		parser: "json",
		...(prettierrc as prettier.Options),
		...options,
	})
}
