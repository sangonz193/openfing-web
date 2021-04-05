import { DirectionalHint, FocusZone, FocusZoneDirection, TeachingBubble } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { useTeachingKeyStatus } from "../../modules/Teaching"
import { coursesRouteConfig } from "../../routes/courses/courses.route.config"
import { faqsRouteConfig } from "../../routes/faqs/faqs.route.config"
import { homeRouteConfig } from "../../routes/home/home.route.config"
import { settingsRouteConfig } from "../../routes/settings/settings.route.config"
import { updatesRouteConfig } from "../../routes/updates/updates.route.config"
import { Breakpoint } from "../../styles/Breakpoint"
import { HELP_CIRCLE_ICON_NAME } from "../Icon/HelpCircle.icon"
import { HOME_ICON_NAME } from "../Icon/Home.icon"
import { SETTINGS_ICON_NAME } from "../Icon/Settings.icon"
import { TIME_ICON_NAME } from "../Icon/Time.icon"
import { VIDEO_CAMERA_ICON_NAME } from "../Icon/VideoCamera.icon"
import { NavbarButton } from "../NavbarButton"
import { useNavbarStyles } from "./useNavbarStyles"

export type NavbarProps = {
	children?: undefined
}

const NavbarComponent: React.FC<NavbarProps> = () => {
	const styles = useNavbarStyles()
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	const [teachingDarkThemeStatus, handleTeachingDarkThemeDismissed] = useTeachingKeyStatus("dark-theme")

	const browserDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
	const navBarSettingsId = "nav-bar-settings"

	return (
		<FocusZone
			direction={isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal}
			className={styles.focusZone}
		>
			<NavbarButton
				exact
				iconName={HOME_ICON_NAME}
				route={homeRouteConfig.path}
				routeName="Home"
				className={styles.navbarButton}
			/>

			<NavbarButton
				exact={false}
				iconName={VIDEO_CAMERA_ICON_NAME}
				route={coursesRouteConfig.path}
				routeName="Cursos"
				className={styles.navbarButton}
			/>

			<NavbarButton
				iconName={TIME_ICON_NAME}
				route={updatesRouteConfig.path}
				routeName="Actualizaciones"
				className={styles.navbarButton}
			/>

			<NavbarButton
				iconName={HELP_CIRCLE_ICON_NAME}
				route={faqsRouteConfig.path}
				routeName="FAQs"
				className={styles.navbarButton}
			/>

			<NavbarButton
				exact
				iconName={SETTINGS_ICON_NAME}
				route={settingsRouteConfig.path}
				routeName="Settings"
				className={styles.settings}
			/>

			{teachingDarkThemeStatus === "showing" && (
				<TeachingBubble
					target={`#${navBarSettingsId}`}
					headline={
						browserDarkMode ? "¿Usando un tema oscuro en el navegador?" : "¿Te gustan los temas oscuros?"
					}
					hasCloseButton
					calloutProps={{ directionalHint: isMd ? DirectionalHint.rightCenter : DirectionalHint.topCenter }}
					onDismiss={handleTeachingDarkThemeDismissed}
				>
					¡Hay una nueva opción de configuración que te puede interesar!
				</TeachingBubble>
			)}
		</FocusZone>
	)
}

export const Navbar = React.memo(NavbarComponent)
