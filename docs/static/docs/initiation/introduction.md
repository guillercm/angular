
### En este proyecto he ido recopilando documentación de diferentes formas:
  
  - Mini apps
  - Archivos PDF
  - Documentos Markdown

- Además, he completado recientemente estos dos cursos de Angular:

    - [Angular: De cero a experto - Edición 2025](https://www.udemy.com/course/angular-fernando-herrera/)
    - [Angular Pro: Lleva tus bases al siguiente nivel - 1/2025](https://www.udemy.com/course/angular-pro-siguiente-nivel/)

      Quiero aclarar que mi forma al hacer cursos es completamente activa, no me limito a mirar al instructor y copiar el código, sino que me esfuerzo en entender lo que se está haciendo, aplicarlo por mi cuenta, experimentar con variaciones y resolver los ejercicios sin depender de la solución.
      En el punto 2 y 3 de este proyecto están algunos de los contenidos de los cursos, entre ellos, las aplicaciones, las cuales yo he mejorado ciertas funcionalidades, por ejemplo:
      - Cuando el usaba el localstorage para cachear cualquier cosa, yo usaba un servicio que me cree por mi cuenta llamado ```SessionService```.
      - En las imágenes, yo uso mi propio componente de imágenes, que está hecho para mostrar un loader en la imagen mientras se carga y también tiene una imagen de error cuando le llega una ruta que no existe.
      - Sus servicios para llamar a la api son bastante diferentes a los míos, ya que yo tengo creado en este proyecto un ```config.json```, del cual tengo establecidas los endpoints de todas las apis que consume.
      - Configuración de interceptores de error, con funcionalidades extras de mostrar loadings de carga y modales para los errores en solicitudes HTTP, por ejemplo, en la aplicación de [tesloshop](./angular-from-zero-to-expert/tesloshop), es una aplicación que tiene un backend y como no está activo, salta una modal configurada a nivel de aplicación.
      - Aunque la aplicación que más funcionalidad como tal agregué es de de [mapas](./angular-from-zero-to-expert/mapbox), a la que le añadí:
        - 2 idiomas configurables, para poder verlo en español o inglés.
        - Funcionalidad para poder guardar lugares y que se queden cacheados (usando mi ```SessionService```)
        - Configuración para mostrar lluvia y nieve en el mapa.
        - El instructor enseñó a como usando la api, crear el recorrido entre 2 puntos geográficos, y yo le añadí que también se puedan ver las explicaciones paso por paso (también en español o inglés), y al pulsar además en cada instrucción, lo dice en alto. 

- La organización de carpetas que tiene el proyecto es esta:
<pre>
    <code>
        src/
        ├── app/
        │   ├── core/
        │   │   ├── services/
        │   │   │   ├── auth.service.ts
        │   │   │   ├── user.service.ts
        │   │   │   └── data.service.ts
        │   │   ├── interceptors/
        │   │   ├── guards/
        │   │   └── models/
        │   ├── shared/
        │   │   ├── components/
        │   │   │   ├── button/
        │   │   │   ├── form/
        │   │   └── directives/
        │   │   └── pipes/
        │   ├── features/
        │   └── app.config.ts
    </code>
</pre>

