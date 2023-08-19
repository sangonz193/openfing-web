export type RegisterPageViewOptions = {
	title: string
	path: string
}

export function registerPageView({ title, path }: RegisterPageViewOptions) {
	gtag("config", "UA-0000000-1", {
		page_title: title,
		page_path: path,
	})
}
