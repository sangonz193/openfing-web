import { Link, Stack, Text } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React from "react"

import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import { useRedirect } from "../../../../hooks/useRedirect"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { useBlogStore } from "../../../../modules/Blog"
import { useGoogleAnalyticsPageView } from "../../../../modules/GoogleAnalytics/useGoogleAnalyticsPageView"
import { useHistory } from "../../../../modules/Navigation/useHistory"
import { useRootEventListener } from "../../../../modules/RootEventListeners"
import { blogRouteConfig } from "../../../blog/blog.route.config"
import { loginRouteConfig } from "../../../login/login.route.config"
import { useHomeStyles } from "./useHomeStyles"

export type HomeProps = {
	children?: undefined
}

const HomeComponent: React.FC<HomeProps> = () => {
	const title = "Inicio"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })
	const styles = useHomeStyles()

	useLayoutOptions({
		showHeader: false,
	})

	const history = useHistory()
	useRootEventListener(
		"onKeyDown",
		React.useCallback((event) => {
			if (event.defaultPrevented) {
				return
			}

			if (keyboardKey.getCode(event.key) === keyboardKey.l) {
				history.push(loginRouteConfig.path)
				event.preventDefault()
			}
		}, [])
	)

	const blogStore = useBlogStore()
	const blogStoreState = useObservableStates(blogStore, ["enabled"])
	useRedirect(blogRouteConfig.path, !blogStoreState.enabled)

	return (
		<div className={styles.wrapper}>
			<div className={styles.backgroundContainer}>
				<div className={styles.backgroundImage} />
			</div>

			<Stack className={styles.contentWrapper} disableShrink>
				<Stack className={styles.topContentContainer} disableShrink>
					<Text className={styles.title} variant="xxLargePlus">
						¡TENEMOS NUEVAS FUNCIONALIDADES!
					</Text>

					<ul>
						<li className={styles.newItem}>
							<Text variant="xLarge">Generamos un reproductor de video adaptado a sus pedidos.</Text>
						</li>

						<li className={styles.newItem}>
							<Text variant="xLarge">
								Presentamos una nueva organización de cursos en subcategorías: teórico / práctico o por
								diferentes ediciones.
							</Text>
						</li>

						<li className={styles.newItem}>
							<Text variant="xLarge">
								Habilitamos la opción de compartir la clase, permitiendo elegir el tiempo de inicio.
							</Text>
						</li>
					</ul>

					<Text className={styles.helpWanted} variant="large">
						Les pedimos ayuda en su testeo. Sus comentarios serán de mucha utilidad para poner en marcha la
						nueva web.
					</Text>

					<Text className={styles.suggestions} variant="xLarge">
						Recibiremos sus sugerencias en{" "}
						<Link className={styles.suggestionsEmail} href="mailto:open@fing.edu.uy">
							open@fing.edu.uy
						</Link>
					</Text>
				</Stack>
			</Stack>
		</div>
	)
}

export const Home = React.memo(HomeComponent)
