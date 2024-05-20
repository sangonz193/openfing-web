import {
  CheckIcon,
  CopyIcon,
  Edit2Icon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { ComponentProps, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCourseLayoutContext } from "@/modules/course/layout/provider"
import { Tables } from "@/supabase/types"
import { cn } from "@/utils/cn"

import { DeleteBookmarkAlertDialog } from "./delete-bookmark-alert-dialog"
import { secondsToInput } from "../share/input-to-seconds"

type Props = {
  bookmark: Tables<"course_class_bookmarks">
  onClicked?: () => void
}

export function BookmarkItem({ bookmark, onClicked }: Props) {
  const { videoRef } = useCourseLayoutContext()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const Comp = bookmark.start_at ? Button : "div"

  return (
    <div className="flex-row rounded-md border py-2">
      <Comp
        {...(Comp === Button &&
          ({
            type: "button",
            variant: "link",
          } satisfies ComponentProps<typeof Button>))}
        className={cn(
          "flex h-auto grow flex-col items-start justify-center gap-0 text-left",
          Comp !== Button && "px-4",
        )}
        onClick={() => {
          if (!videoRef.current || bookmark.start_at === null) return

          videoRef.current.currentTime = bookmark.start_at
          onClicked?.()
        }}
      >
        <span className="text-lg font-semibold">{bookmark.title}</span>
        {!!bookmark.start_at && (
          <span className="-mt-1 mb-1 text-xs text-muted-foreground">
            {secondsToInput(bookmark.start_at)}
            {!!bookmark.end_at && (
              <>
                {" - "}
                {secondsToInput(bookmark.end_at)}
              </>
            )}
          </span>
        )}

        {!!bookmark.description && (
          <span className="text-base font-normal">{bookmark.description}</span>
        )}
      </Comp>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="mr-2">
            <span className="sr-only">Acciones</span>
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <CopyMenuItem bookmark={bookmark} />

          <DropdownMenuItem disabled>
            <Edit2Icon className="mr-2 size-4" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-700 hover:text-red-700 focus:text-red-700"
            onClick={() => setShowDeleteAlert(true)}
          >
            <TrashIcon className="mr-2 size-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteBookmarkAlertDialog
        open={showDeleteAlert}
        bookmark={bookmark}
        onClose={() => setShowDeleteAlert(false)}
      />
    </div>
  )
}

function CopyMenuItem({ bookmark }: Pick<Props, "bookmark">) {
  const pathname = usePathname()

  let url = `${window.location.origin}${pathname}#t=${bookmark.start_at}`
  if (bookmark.end_at) {
    url += `,${bookmark.end_at}`
  }

  const [copied, setCopied] = useState(0)
  useEffect(() => {
    if (!copied) return

    const timeout = setTimeout(() => {
      setCopied(0)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [copied])

  const Icon = copied ? CheckIcon : CopyIcon

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault()

        navigator.clipboard.writeText(url).then(() => {
          setCopied(copied + 1)
        })
      }}
    >
      <Icon className="mr-2 size-4" />
      {copied ? "Copiado" : "Copiar link"}
    </DropdownMenuItem>
  )
}
