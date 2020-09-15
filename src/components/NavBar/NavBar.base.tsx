import { DirectionalHint } from "@fluentui/react/lib/Callout";
import { FocusZone, FocusZoneDirection } from "@fluentui/react/lib/FocusZone";
import { TeachingBubble } from "@fluentui/react/lib/TeachingBubble";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "src/style";

import { useTeachingKeyStatus } from "../../modules/Teaching";
import { routeConfigMap } from "../../routeConfigMap";
import { NavBarButton } from "../NavBarButton";
import { NavBarProps, NavBarStyleProps, NavBarStyles } from "./NavBar.types";

const getClassNames = classNamesFunction<NavBarStyleProps, NavBarStyles>();

export const NavBarBase = (props: NavBarProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	const isMd = useMediaQuery({ minWidth: Breakpoint.md });

	const [teachingDarkThemeStatus, handleTeachingDarkThemeDismissed] = useTeachingKeyStatus("dark-theme");

	const browserDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
	const navBarSettingsId = "nav-bar-settings";

	return (
		<FocusZone
			className={classNames.root}
			direction={isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal}
		>
			<NavBarButton exact route={routeConfigMap.home.path} routeName="Inicio" iconProps={{ iconName: "Home" }} />

			<NavBarButton exact={false} route="/courses" routeName="Cursos" iconProps={{ iconName: "VideoCamera" }} />

			<NavBarButton
				route={routeConfigMap.updates.path}
				routeName="Actualizaciones"
				iconProps={{ iconName: "Time" }}
			/>

			<NavBarButton route={routeConfigMap.faqs.path} routeName="FAQs" iconProps={{ iconName: "HelpCircle" }} />

			<NavBarButton
				id={navBarSettingsId}
				route={routeConfigMap.settings.path}
				routeName="Ajustes"
				iconProps={{ iconName: "Settings" }}
				styles={classNames.subComponentStyles.settingsButton}
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
	);
};
