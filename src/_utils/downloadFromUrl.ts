export const downloadFromUrl = (url: string) => {
	const a = document.createElement("a")
	a.style.display = "none"
	document.body.appendChild(a)

	a.href = url

	a.setAttribute("download", a.href)
	a.setAttribute("target", "_blank")
	a.setAttribute("type", "application/octet-stream")

	a.click()

	window.URL.revokeObjectURL(a.href)
	document.body.removeChild(a)
}
