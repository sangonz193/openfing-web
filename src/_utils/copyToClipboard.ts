// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
export const copyToClipboard = (value: string) => {
	const el = document.createElement("textarea")
	el.value = value // Set its value to the string that you want copied
	el.setAttribute("readonly", "") // Make it readonly to be tamper-proof
	el.style.position = "absolute"
	el.style.left = "-9999px" // Move outside the screen to make it invisible
	document.body.appendChild(el) // Append the <textarea> element to the HTML document
	let selection = document.getSelection()
	const selected = selection !== null && selection.rangeCount > 0 && selection.getRangeAt(0) // Store selection if found
	el.select() // Select the <textarea> content
	document.execCommand("copy") // Copy - only works as a result of a user action (e.g. click events)
	document.body.removeChild(el) // Remove the <textarea> element
	if (selected) {
		// If a selection existed before copying
		selection = document.getSelection()
		if (selection !== null) {
			selection.removeAllRanges()
		} // Unselect everything on the HTML document

		selection = document.getSelection()

		if (selection !== null) {
			selection.addRange(selected)
		} // Restore the original selection
	}
}
