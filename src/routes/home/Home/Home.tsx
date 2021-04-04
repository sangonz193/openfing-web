import { Link, Stack, Text } from "@fluentui/react";
import React from "react";

import { useLayoutOptions } from "../../../components/Layout/useLayoutOptions";
import { useHomeStyles } from "./useHomeStyles";

export type HomeProps = {
	children?: undefined;
};

const HomeComponent: React.FC<HomeProps> = () => {
	const styles = useHomeStyles();

	useLayoutOptions({
		showHeader: false,
	});

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
						<Link className={styles.suggestionsEmail} anchorProps={{ href: "mailto:open@fing.edu.uy" }}>
							open@fing.edu.uy
						</Link>
					</Text>
				</Stack>
			</Stack>
		</div>
	);
};

export const Home = React.memo(HomeComponent);
