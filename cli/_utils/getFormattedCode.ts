import * as prettier from "prettier"

import Prettierrc from "../../.prettierrc"

export const getFormattedCode = (code: string): Promise<string> => {
	return prettier.format(code, {
		parser: "typescript",
		...(Prettierrc as prettier.Options),
	})
}
