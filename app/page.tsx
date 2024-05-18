import Link from "next/link"

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Link href="/courses">Courses</Link>
    </div>
  )
}
