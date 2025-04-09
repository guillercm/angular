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
![workspace](img/npm/workspace2.png)

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

