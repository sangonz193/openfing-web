import {
	ClockIcon,
	Cog6ToothIcon,
	HomeIcon,
	QuestionMarkCircleIcon,
	VideoCameraIcon,
} from "@heroicons/react/24/outline"
import {
	ClockIcon as ClockSolidIcon,
	Cog6ToothIcon as Cog6ToothSolidIcon,
	HomeIcon as HomeSolidIcon,
	QuestionMarkCircleIcon as QuestionMarkCircleSolidIcon,
	VideoCameraIcon as VideoCameraSolidIcon,
} from "@heroicons/react/24/solid"

import { cn } from "@/lib/cn"

import { NavbarButton } from "./navbar-button"

type Props = {
	className?: string
}

export function Navbar(props: Props) {
	const { className } = props

	return (
		<div className={cn("flex gap-2 overflow-auto px-2 py-2 max-md:border-t md:flex-col", className)}>
			<NavbarButton to="/" exact label="Inicio" Icon={HomeIcon} SolidIcon={HomeSolidIcon} />
			<NavbarButton to="/courses" label="Cursos" Icon={VideoCameraIcon} SolidIcon={VideoCameraSolidIcon} />
			<NavbarButton to="/updates" label="Últimas" Icon={ClockIcon} SolidIcon={ClockSolidIcon} />
			<NavbarButton
				to="/faqs"
				label="FAQs"
				Icon={QuestionMarkCircleIcon}
				SolidIcon={QuestionMarkCircleSolidIcon}
			/>
			<NavbarButton
				to="/settings"
				label="Ajustes"
				Icon={Cog6ToothIcon}
				SolidIcon={Cog6ToothSolidIcon}
				className="md:mt-auto"
			/>
		</div>
	)
}
