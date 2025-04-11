### Crear paquetes personalizados de Angular a NPM
<br>

#### Crear monorepo y librería - apx-workspace

[Documentación oficial sobre las librerías de Angular](https://angular.dev/tools/libraries/creating-libraries)

Creación de Workspace monorepo.
La idea de un monorepo es tener aplicaciones, de angular en este caso, que pueden compartir ciertas cosas, como los módulos de node.
```bash
    ng new grcm-workspace --no-create-application
```
![workspace](img/npm/workspace.png)

```bash
    ng generate library grcm-components
```
En este package.json podemos establecer en las peerDependencies, las dependencias que el proyecto original debe de tener, en nuestro caso, nuestro paquete sólo funcionaría en proyectos con versiones igual o superior a la 19.2.0 de angular.


En src/public.api.ts, podremos exportar todos los componentes, servicios y demás que queramos usar fuera del paquete.

```bash
    # Para desarrollo
    ng build grcm-components --configuration development
    # Para produccion (más optimizado)
    ng build grcm-components
    # Para ejecutar los tests
    ng test grcm-components
    # Ejecuta una herramienta para detectar errores en el código
    ng lint grcm-components

    # Para publicar la librería
    ng build grcm-components
    cd dist/grcm-components
    npm publish

    # Para crear una aplicación de pruebas
    ng generate application grcm-testbed-app
```
<br>

#### Publicar a NPM

- Crearse una cuenta en npm

- Ejecutar:

```bash
    npm login
```

- Teniendo estos scripts en el ```package.json``` de nuestro workspace:
```json
{
    "name": "grcm-workspace",
    "version": "0.0.0",
    "scripts": {
        ...
        "grcm-components:test": "ng test grcm-components --no-watch --no-progress --browsers=ChromeHeadless",
        "grcm-components:lint": "ng lint grcm-components",
        "grcm-components:build": "ng build grcm-components",
        "grcm-components:publish": "npm run grcm-components:test && npm run grcm-components:lint && grcm-components:build && npm publish dist/grcm-components/",
        "grcm-testbed-app:build": "ng build grcm-testbed-app",
        "start:grcm-testbed-app": "ng serve grcm-testbed-app",
        "serve:ssr:grcm-testbed-app": "node dist/grcm-testbed-app/server/server.mjs"
    },
    ...
}
```

- Ejecutar:

```bash
    npm run grcm-components:publish
```