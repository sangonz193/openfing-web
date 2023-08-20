import * as prettier from "prettier"

import prettierrc from "../../.prettierrc"

export const getFormattedCode = (code: string, options?: Partial<prettier.Options>): Promise<string> => {
	return prettier.format(code, {
		parser: "typescript",
		...(prettierrc as prettier.Options),
		...options,
	})
}
