# OpenFING Web

Este es el proyecto web de la plataforma de OpenFING.

## Configuración del entorno de desarrollo

### Herramientas requeridas

-   [Node.js](https://nodejs.org/en/): **v15**
    -   Se recomienda la instalación de node con [nvm](https://github.com/nvm-sh/nvm), ya que le permite cambiar entre versiones fácilmente.
-   [npm](https://www.npmjs.com/): **v9**
    -   Es importante que la versión de npm sea la requerida aquí, ya que diferentes versiones pueden causar cambios al archivo _package-lock.json_. Se puede instalar esta versión de npm corriendo el comando `npm i -g npm@9`.
-   [OpenFING server](https://github.com/sangonz193/openfing-server): **v0.0.1**
    -   Este proyecto esta pensado para trabajar en conjunto con una instancia del backend de OpenFING. Siga las instrucciones en el archivo _README.md_ de tal proyecto.

### Pasos para levantar el proyecto

-   Clonar este repositorio y abrir una terminal dentro de la carpeta creada.
-   Correr el comando `npm i` para instalar dependencias.
-   Crear un archivo _.env_ dentro de la carpeta del proyecto. El archivo debe contener las mismas variables de entorno definidas en los archivos _.env.app_ y _.env.cli_. Se puede empezar por correr el comando `node cli create env-file`, y luego modificando los valores según necesite.
-   > Nota: Solo las variables definidas en el archivo _.env.app_ serán accesibles desde el código de la app. La utilidad de linea de comandos tiene acceso a las variables listadas en ambos archivos. En cualquier caso, los valores de tales variables serán los definidos en el archivo _.env_, o en el caso de que el valor no esté definido se leerá del entorno de ejecución.

### Corriendo la aplicación en modo de desarrollo

El comando `npm run dev` (o `node cli dev`) será el que utilizar para levantar el servidor de desarrollo. Dependiendo del valor de la variable de entorno `PORT`, la aplicación quedará disponible en _http<span></span>://localhost:$PORT_.

## Utilidad de linea de comandos

Aparte de la aplicación en sí, el proyecto contiene una utilidad de linea de comandos que podrá encontrar útil mientras desarrolla. Para invocarla, correr `node cli <command>` ubicado en la carpeta del proyecto. Por información detallada sobre los comandos que están disponibles, correr `node cli --help` para mostrar una lista de comandos. Para información sobre un comando en específico, correr `node cli <command> --help`, donde _<command>_ es el nombre del comando en la lista anterior.

## License

[MIT](https://choosealicense.com/licenses/mit/)
