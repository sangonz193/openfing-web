import { List } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import DOMPurify from "dompurify";
import React from "react";
import ReactHtmlParser from "react-html-parser";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { HomeProps, HomeStyleProps, HomeStyles } from "./Home.types";

const getClassNames = classNamesFunction<HomeStyleProps, HomeStyles>();
const posts = [
	{
		node: {
			id: "445061b0-f7a6-4183-8492-ba081ec4058f",
			title: "¿Dónde se publican los videos?",
			content:
				"Los videos los publicamos en la página de OpenFING en cuanto la edición esté lista y los docentes dieron su confirmación.",
		},
	},
	{
		node: {
			id: "2ca56c86-5bd7-494f-b976-af567cb5dae0",
			title: "¿Los videos se pueden editar, cortar o modificar de alguna forma?",
			content:
				"No, está prohibido alterar los videos de cualquier forma, estos deben usarse tal y como se proporcionan.",
		},
	},
	{
		node: {
			id: "7a37f4ba-2df1-4f53-889e-2cefc215fdc9",
			title: "¿Cómo citar los videos?",
			content:
				"Sugerimos citar los videos de la siguiente forma:<br/>    [Nombre del video], [nombre del docente] (si se encuentra disponible), Proyecto OpenFING, [URL del video], publicado bajo una licencia CC By NC ND.",
		},
	},
	{
		node: {
			id: "f7e69bd6-306d-4228-98ac-a77973183ad4",
			title: "¿Puedo incorporar los videos en un aula virtual o en un material educativo?",
			content:
				"Si, siempre que sea sin fines de lucro y se cite la fuente y autor de la obra de forma razonable.",
		},
	},
	{
		node: {
			id: "1b11e783-d9f7-4c01-852f-635f80880a4f",
			title: "¿En qué consiste la filmación?",
			content:
				"Las filmaciones se asumen en grupo, en general se asumen entre 4 estudiantes que se van turnando los días. Es vital que los responsables de filmar una clase no falten, y si por algún motivo no pueden asistir, avisen con tiempo de manera que otra persona los pueda cubrir y no perdamos esa clase!",
		},
	},
	{
		node: {
			id: "ed15a6db-ce6f-4e78-99c3-e785825e72ce",
			title: "¿En qué consiste la edición?",
			content:
				"El trabajo de edición consiste en tomar el video grabado por la cámara, el audio grabado desde el micrófono, sincronizarlos (si se grabaron independientemente), agregar una introducción con el nombre del curso y número de clase, y revisarlo por completo por si hay que cortar alguna parte.",
		},
	},
	{
		node: {
			id: "8ac3d173-6bd5-4dc9-9866-54b616ff778d",
			title: "¿Qué archivos generan?",
			content:
				"El proceso de exportar el video y su posterior conversión está automatizado, tenemos scripts que generan los videos adecuados y con una calidad razonable para Internet.",
		},
	},
	{
		node: {
			id: "342a9d3f-25f4-49dc-9a8a-ed270ca10932",
			title: "¿Qué hago con los videos editados?",
			content:
				"Contamos con un servidor SFTP en donde pueden ir subiendo los videos a medida que los editan, pidan usuario y contraseña una vez que se unieron al proyecto.",
		},
	},
	{
		node: {
			id: "3ac36d42-ea5f-4233-a25a-daa8bb8beb2b",
			title: "¿Para qué se pueden utilizar los videos?",
			content:
				"Los videos admiten únicamente usos que no involucren fines de lucro, tales como los usos meramente educativos o de autoformación.",
		},
	},
	{
		node: {
			id: "78a79cd5-5d3a-4f2a-be9e-3593fd8fd5ee",
			title: "¿Cómo difundo el proyecto?",
			content:
				"Seguinos en Facebook y compartí nuestras publicaciones para así llegar al máximo de estudiantes de FIng! :)",
		},
	},
	{
		node: {
			id: "f34b79b8-b1d1-4075-a5fd-89b2fbb56dd6",
			title: "¿Cómo se puede comunicar con OpenFING?",
			content:
				"A través del <a href='https://es-la.facebook.com/openfing'>Facebook</a>, <a href='https://www.instagram.com/openfing'>Instagram</a> y del correo <a href='mailto:open@fing.edu.uy'>open@fing.edu.uy</a>",
		},
	},
	{
		node: {
			id: "1dcb8f00-4784-4655-a871-d0513b1fe9a6",
			title: "¿Cómo puedo participar en OpenFING?",
			content:
				"Puedes participar como voluntario en la grabación y/o edición de un curso de la FIng. Los voluntarios han sido el motor de OpenFING y han permitido crecer y grabar más de 50 cursos y 1200 clases.  También puedes participar como estudiante inscripto al curso Iniciación a la Producción Audiovisual y Multimedia - IPAM y obtener créditos.",
		},
	},
	{
		node: {
			id: "5e099ad7-37ff-46b5-b398-21b5223f7d75",
			title: "¿Dan créditos por participar del proyecto?",
			content:
				"A partir del segundo semestre del 2016, las carreras de Computación y Eléctrica aprobaron el curso optativo IPAM Iniciación a la Producción Audiovisual y Multimedia que otorga 6 créditos. (<a href='https://eva.fing.edu.uy/course/view.php?id=940'>Enlace al EVA</a>). Es coordinado por la Unidad de Enseñanza y dictado por docentes de la Facultad de Información y Comunicación de la UdelaR.",
		},
	},
];

export const HomeBase = (props: HomeProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme, className: props.className });

	useLayoutOptions(
		React.useCallback(
			() => ({
				header: {
					title: "Blog",
				},
			}),
			[]
		)
	);

	return (
		<Stack className={classNames.root} data-is-scrollable>
			<Stack className={classNames.contentWrapper} disableShrink>
				<List
					items={posts}
					onRenderCell={(item) => {
						if (!item) return null;

						return (
							<>
								<div className={classNames.itemWrapper}>
									<div className={classNames.itemImage} />

									<Text styles={classNames.subComponentStyles.itemTitle} variant="xxLarge">
										{item.node.title}
									</Text>

									<Text
										styles={{
											root: { marginLeft: 0, marginTop: 5, marginBottom: 20, paddingLeft: 20 },
										}}
										variant="small"
									>
										October 9th, 2021
									</Text>

									<Text styles={classNames.subComponentStyles.itemContent}>
										{ReactHtmlParser(DOMPurify.sanitize(item.node.content))}
										{ReactHtmlParser(DOMPurify.sanitize(item.node.content))}
										{ReactHtmlParser(DOMPurify.sanitize(item.node.content))}
									</Text>
								</div>

								<div className={classNames.itemSeparator} />
							</>
						);
					}}
					getKey={(item) => item.node.id}
				/>
			</Stack>
		</Stack>
	);
};
