import { LoaderCircleIcon } from "lucide-react"

import { cn } from "@/utils/cn"

type Props = {
  className?: string
}

export function Spinner({ className }: Props) {
  return <LoaderCircleIcon className={cn("mx-auto animate-spin", className)} />
}
