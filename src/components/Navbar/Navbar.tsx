import type { IDialogContentProps } from "@fluentui/react"
import {
	CommandBarButton,
	DefaultButton,
	Dialog,
	DialogFooter,
	DialogType,
	DirectionalHint,
	FocusZone,
	FocusZoneDirection,
	PrimaryButton,
	TeachingBubble,
} from "@fluentui/react"
import { useBoolean } from "@fluentui/react-hooks"
import React, { useCallback, useMemo } from "react"
import { useMediaQuery } from "react-responsive"

import { useAuthStore } from "../../auth"
import { useInitialRefreshToken } from "../../auth/useInitialRefreshToken"
import { useBlogStore } from "../../blog"
import { useObservableStates } from "../../hooks/useObservableStates"
import { useInitializationStore } from "../../initialization/useInitializationStore"
import { blogRouteConfig } from "../../routes/blog/blog.route.config"
import { coursesRouteConfig } from "../../routes/courses/courses.route.config"
import { faqsRouteConfig } from "../../routes/faqs/faqs.route.config"
import { homeRouteConfig } from "../../routes/home/home.route.config"
import { settingsRouteConfig } from "../../routes/settings/settings.route.config"
import { updatesRouteConfig } from "../../routes/updates/updates.route.config"
import { Breakpoint } from "../../styles/Breakpoint"
import { useTeachingKeyStatus } from "../../teaching"
import { HELP_CIRCLE_ICON_NAME } from "../Icon/help-circle.generated"
import { HELP_CIRCLE_OUTLINE_ICON_NAME } from "../Icon/help-circle-outline.generated"
import { HOME_ICON_NAME } from "../Icon/home.generated"
import { HOME_OUTLINE_ICON_NAME } from "../Icon/home-outline.generated"
import { LOG_OUT_OUTLINE_ICON_NAME } from "../Icon/log-out-outline.generated"
import { NEWSPAPER_ICON_NAME } from "../Icon/newspaper.generated"
import { NEWSPAPER_OUTLINE_ICON_NAME } from "../Icon/newspaper-outline.generated"
import { REFRESH_CIRCLE_OUTLINE_ICON_NAME } from "../Icon/refresh-circle-outline.generated"
import { SETTINGS_ICON_NAME } from "../Icon/settings.generated"
import { SETTINGS_OUTLINE_ICON_NAME } from "../Icon/settings-outline.generated"
import { TIME_ICON_NAME } from "../Icon/time.generated"
import { TIME_OUTLINE_ICON_NAME } from "../Icon/time-outline.generated"
import { VIDEOCAM_ICON_NAME } from "../Icon/videocam.generated"
import { VIDEOCAM_OUTLINE_ICON_NAME } from "../Icon/videocam-outline.generated"
import { NavbarButton } from "../NavbarButton"
import { useNavbarStyles } from "./useNavbarStyles"

export type NavbarProps = {
	children?: undefined
	className?: string
}

const NavbarComponent: React.FC<NavbarProps> = ({ className }: NavbarProps) => {
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })
	const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true)

	const [teachingDarkThemeStatus, handleTeachingDarkThemeDismissed] = useTeachingKeyStatus("dark-theme")

	const browserDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
	const navBarSettingsId = "nav-bar-settings"

	const authStore = useAuthStore()
	const { grant } = useObservableStates(authStore, ["grant"])
	const initializationStore = useInitializationStore()
	const handleSignOut = useCallback(() => initializationStore.reset(), [])

	const dialogContentProps = useMemo(() => {
		const dialogContentProps: IDialogContentProps = {
			type: DialogType.normal,
			title: "Cerrar sesión",
			closeButtonAriaLabel: "Cerrar",
			subText: "¿Está seguro de que desea cerrar sesión?",
		}

		return dialogContentProps
	}, [])

	const [refreshTokenState, retryRefreshToken] = useInitialRefreshToken({})

	const styles = useNavbarStyles({
		className: className,
		disabledRetryRefreshToken: !grant?.token && refreshTokenState.fetching,
	})

	const blogStore = useBlogStore()
	const blogStoreState = useObservableStates(blogStore, ["enabled"])

	return (
		<FocusZone
			direction={isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal}
			className={styles.focusZone}
		>
			{!blogStoreState.enabled && !grant ? (
				<NavbarButton
					exact
					iconName={HOME_OUTLINE_ICON_NAME}
					activeIconName={HOME_ICON_NAME}
					route={homeRouteConfig.path}
					routeName="Inicio"
				/>
			) : (
				<NavbarButton
					exact
					iconName={NEWSPAPER_OUTLINE_ICON_NAME}
					activeIconName={NEWSPAPER_ICON_NAME}
					route={blogRouteConfig.path}
					routeName="Blog"
				/>
			)}

			<NavbarButton
				exact={false}
				iconName={VIDEOCAM_OUTLINE_ICON_NAME}
				activeIconName={VIDEOCAM_ICON_NAME}
				route={coursesRouteConfig.path}
				routeName="Cursos"
			/>

			<NavbarButton
				iconName={TIME_OUTLINE_ICON_NAME}
				activeIconName={TIME_ICON_NAME}
				route={updatesRouteConfig.path}
				routeName="Actualizaciones"
			/>

			<NavbarButton
				iconName={HELP_CIRCLE_OUTLINE_ICON_NAME}
				activeIconName={HELP_CIRCLE_ICON_NAME}
				route={faqsRouteConfig.path}
				routeName="FAQs"
			/>

			{isMd && <div style={{ flex: 1 }} />}

			{!!grant && !grant.token && (
				<CommandBarButton
					className={styles.retryRefreshToken}
					title="Reintentar inicio de sesión"
					disabled={refreshTokenState.fetching}
					iconProps={{ iconName: REFRESH_CIRCLE_OUTLINE_ICON_NAME }}
					onClick={retryRefreshToken}
				/>
			)}

			{!!grant && (
				<CommandBarButton
					className={styles.logout}
					title="Cerrar sesión"
					iconProps={{ iconName: LOG_OUT_OUTLINE_ICON_NAME }}
					onClick={toggleHideDialog}
				/>
			)}

			<Dialog hidden={hideDialog} dialogContentProps={dialogContentProps}>
				<DialogFooter>
					<PrimaryButton onClick={handleSignOut} text="Cerrar sesión" />
					<DefaultButton onClick={toggleHideDialog} text="Cancelar" />
				</DialogFooter>
			</Dialog>

			<NavbarButton
				exact
				iconName={SETTINGS_OUTLINE_ICON_NAME}
				activeIconName={SETTINGS_ICON_NAME}
				route={settingsRouteConfig.path}
				routeName="Ajustes"
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
