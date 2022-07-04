import type { History } from "history"

export type OpenLinkOptions = {
	link: string
} & (
	| {
			newWindow?: false
			history: History
	  }
	| {
			newWindow: true
			history?: History
	  }
)

export function openLink(options: OpenLinkOptions) {
	if (options.newWindow) {
		window.open(options.link, "_blank")
		return
	}

	options.history.push(options.link)
}
