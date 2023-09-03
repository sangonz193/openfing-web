import { Stack, Text } from "@fluentui/react"
import keyboardKey from "keyboard-key"
import React, { useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useBlogStore } from "../../../../blog"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import { useRedirect } from "../../../../hooks/useRedirect"
import { useRootEventListener } from "../../../../rootEventListeners"
import { blogRouteConfig } from "../../../blog/blog.route.config"
import { loginRouteConfig } from "../../../login/login.route.config"
import { useHomeStyles } from "./useHomeStyles"

export const Home: React.FC = () => {
	const styles = useHomeStyles()

	const navigate = useNavigate()
	useRootEventListener(
		"onKeyDown",
		useCallback((event) => {
			if (event.defaultPrevented) {
				return
			}

			if (keyboardKey.getCode(event.key) === keyboardKey.l) {
				navigate(loginRouteConfig.path)
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
						<Link className={styles.suggestionsEmail} to="mailto:open@fing.edu.uy">
							open@fing.edu.uy
						</Link>
					</Text>
				</Stack>
			</Stack>
		</div>
	)
}
