import { fs } from "@sangonz193/utils/node/fs"

import { getFormattedCode } from "../../cli/_utils/getFormattedCode"
import { generatedFileHeader } from "../generatedFileHeader"

const svgFileContent = getFormattedCode(
	[
		generatedFileHeader,
		`import type {FC, SVGAttributes} from "react"\n`,
		`export declare const ReactComponent: FC<SVGAttributes<SVGElement>>\n`,
		`declare const filePath: string;`,
		`export default filePath;\n`,
	].join("\n")
)

export async function writeSvgTypeFile(svgFilePath: string) {
	return fs.writeFile(svgFilePath + ".d.ts", await svgFileContent, "utf8")
}
