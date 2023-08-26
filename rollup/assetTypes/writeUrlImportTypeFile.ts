import { fs } from "@sangonz193/utils/node/fs"

import { getFormattedCode } from "../../cli/_utils/getFormattedCode"
import { generatedFileHeader } from "../generatedFileHeader"

const urlImportContent = getFormattedCode(
	[generatedFileHeader, `declare const filePath: string`, `export default filePath\n`].join("\n")
)

export async function writeUrlImportTypeFile(filePath: string) {
	return fs.writeFile(filePath + ".d.ts", await urlImportContent, "utf8")
}
