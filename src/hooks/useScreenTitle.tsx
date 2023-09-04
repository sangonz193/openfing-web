import { useLayoutOptions } from "@/components/new-layout/context"

import { appConfig } from "../app.config"
import { useDocumentTitle } from "./useDocumentTitle"

export function useScreenTitle(title: string) {
	useDocumentTitle(`${title} - ${appConfig.name}`)
	useLayoutOptions({
		headerTitle: title,
	})
}
