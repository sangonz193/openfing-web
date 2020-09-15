import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import React from "react";
import { Link } from "src/components/Link";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { HomeProps, HomeStyleProps, HomeStyles } from "./Home.types";

const getClassNames = classNamesFunction<HomeStyleProps, HomeStyles>();

export const HomeBase = (props: HomeProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	useLayoutOptions(
		React.useCallback(
			() => ({
				header: { hide: true },
			}),
			[]
		)
	);

	return (
		<div className={classNames.root}>
			<div className={classNames.backgroundContainer}>
				<div className={classNames.backgroundImage} />
			</div>

			<Stack className={classNames.contentWrapper} disableShrink>
				<Stack className={classNames.topContentContainer} disableShrink>
					<Text className={classNames.title} variant="xxLargePlus">
						¡TENEMOS NUEVAS FUNCIONALIDADES!
					</Text>

					<ul className={classNames.newItemList}>
						<li className={classNames.newItem}>
							<Text variant="xLarge">Generamos un reproductor de video adaptado a sus pedidos.</Text>
						</li>

						<li className={classNames.newItem}>
							<Text variant="xLarge">
								Presentamos una nueva organización de cursos en subcategorías: teórico / práctico o por
								diferentes ediciones.
							</Text>
						</li>

						<li className={classNames.newItem}>
							<Text variant="xLarge">
								Habilitamos la opción de compartir la clase, permitiendo elegir el tiempo de inicio.
							</Text>
						</li>
					</ul>

					<Text className={classNames.helpWanted} variant="large">
						Les pedimos ayuda en su testeo. Sus comentarios serán de mucha utilidad para poner en marcha la
						nueva web.
					</Text>

					<Text className={classNames.suggestions} variant="xLarge">
						Recibiremos sus sugerencias en{" "}
						<Link className={classNames.suggestionsEmail} anchorProps={{ href: "mailto:open@fing.edu.uy" }}>
							open@fing.edu.uy
						</Link>
					</Text>
				</Stack>
			</Stack>
		</div>
	);
};
