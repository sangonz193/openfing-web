export const secondsToString: (seconds: number, length?: "seconds" | "minutes" | "hours") => string = (
	seconds,
	length
) => {
	const secondsLeft = Math.floor(seconds % 60)
	const minutes = Math.floor((seconds / 60) % 60)
	const hours = Math.floor(seconds / 60 / 60)

	let result = secondsLeft.toString().padStart(2, "0")

	if (length !== "seconds") {
		result = `${minutes.toString().padStart(2, "0")}:${result}`
	}

	if (length !== "minutes") {
		result = `${hours.toString().padStart(2, "0")}:${result}`
	}

	return result
}
