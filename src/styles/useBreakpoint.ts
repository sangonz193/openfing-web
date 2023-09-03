import { useMediaQuery } from "react-responsive"

const screens = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px",
}

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

export function useBreakpoint(breakpoint: Breakpoint) {
	const match = useMediaQuery({ minWidth: screens[breakpoint] })
	return match
}
