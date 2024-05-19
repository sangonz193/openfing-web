import { notFound } from "next/navigation"

import { cn } from "@/utils/cn"
import { createClient } from "@/utils/supabase/server"

export default async function Page({
  params,
}: {
  params: { code: string; number: string }
}) {
  const supabase = createClient()
  const { data: courseClass } = await supabase
    .from("course_classes")
    .select("name, course_class_lists!inner(*)")
    .eq("number", params.number)
    .eq("course_class_lists.code", params.code)
    .single()

  if (!courseClass) return notFound()

  return (
    <div className="flex grow flex-col px-4 pt-2">
      <div className="flex flex-col overflow-hidden rounded-md [-webkit-transform:translateZ(0)]">
        <video
          autoPlay
          controls
          className={cn(
            "aspect-video bg-black",

            // https://stackoverflow.com/questions/20037784/html5-video-border-radius-in-chrome-not-working
            "[-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)]",
          )}
        >
          <source
            src={`https://open.fing.edu.uy/media/${params.code}/${params.code}_${params.number.toString().padStart(2, "0")}.mp4`}
          />
        </video>
      </div>
    </div>
  )
}
