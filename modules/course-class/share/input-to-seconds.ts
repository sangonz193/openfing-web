export function inputToSeconds(value: string) {
  let seconds = 0
  const sections = value.split(":").reverse()

  for (let i = 0; i < Math.min(3, sections.length); i++) {
    const section = sections[i]
    const parsedSection = Number(section)
    if (isNaN(parsedSection)) return undefined

    seconds += parsedSection * 60 ** i
  }

  return seconds
}

export function secondsToInput(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}
