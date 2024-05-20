export function getVideoUrl({
  code,
  number,
}: {
  code: string
  number: number | string
}) {
  return `https://open.fing.edu.uy/media/${code}/${code}_${number.toString().padStart(2, "0")}.mp4`
}
