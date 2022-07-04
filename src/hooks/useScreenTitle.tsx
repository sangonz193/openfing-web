import { appConfig } from "../app.config"
import { useLayoutOptions } from "../components/Layout/useLayoutOptions"
import { useDocumentTitle } from "./useDocumentTitle"

export function useScreenTitle(title: string) {
	useDocumentTitle(`${title} - ${appConfig.name}`)
	useLayoutOptions({
		headerTitle: title,
	})
}
