# OpenFING Web

Este es el proyecto web de la plataforma de OpenFING.

## Levantar el proyecto

Para levantar el proyecto, es necesario tener instalado [Node.js](https://nodejs.org/en/). Una vez instalado, seguir estos pasos:

-   Clonar el repo y abrir la terminal en la carpeta generada.
-   Correr `npm i` para instalar las dependencias del proyecto.
-   De no tener el proyecto [openfing-server](https://github.com/sangonz193/openfing-server) levantado, seguir los pasos para hacerlo.
-   Crear un archivo de variables de entorno `.env` en la misma carpeta. El archivo deberá tener las mismas entradas que el archivo `.env.example`. Usar las descripciones en este último archivo para asignar los valores correctos.
-   Correr el comando `npm run start`. Al iniciar, el comando mostrará información parecida al siguiente bloque:
    ```
    ℹ ｢wds｣: Project is running at http://0.0.0.0:3000/
    ℹ ｢wds｣: webpack output is served from /
    ℹ ｢wds｣: Content not from webpack is served from **
    ℹ ｢wds｣: 404s will fallback to /index.html
    Starting server on http://localhost:3000
    ```
    De aquí es importante notar la última linea: Starting server on http://localhost:3000. Es en esa url que la web quedará disponible localmente.

## License

[MIT](https://choosealicense.com/licenses/mit/)
