import { RadioGroup } from "@headlessui/react"

import { cn } from "@/lib/cn"
import type { ThemeKey } from "@/styles/themes"

type Props = {
	themeKey: ThemeKey
	label: string
}

export function ThemeRadioOption(props: Props) {
	const { themeKey, label } = props

	return (
		<RadioGroup.Option key={themeKey} value={themeKey} className="mr-auto flex cursor-pointer items-center gap-2">
			{({ checked }) => (
				<>
					<span
						className={cn(
							"flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
							checked && "border-primary"
						)}
					>
						{checked && <span className="h-2 w-2 rounded-full bg-primary" />}
					</span>

					<RadioGroup.Label className="mr-auto cursor-pointer text-center text-base text-foreground">
						{label}
					</RadioGroup.Label>
				</>
			)}
		</RadioGroup.Option>
	)
}
