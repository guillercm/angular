### SEO (Search Engine Optimization)

- Conjunto de técnicas que se aplican a una página web para que aparezca en los resultados de búsqueda de los motores de búsqueda.

- El objetivo del SEO es mejorar la visibilidad de una página web y conseguir más tráfico orgánico (número de visitas a un sitio web que provienen de resultados de búsqueda no pagados).
Para ello, se optimiza la estructura y los metadatos de la web.

### SPA (Single-Page Application)

- Tipo de aplicación web que ejecuta todo su contenido en una sola página. Funciona cargando el contenido HTML, CSS y JavaScript por completo al abrir la web.

### SSR (Server-Side Rendering)

- SSR implica generar HTML en el servidor durante la ejecución. Esto significa que el HTML se pre-renderiza en el servidor antes de enviarse al navegador del usuario. Una vez que el HTML llega al navegador, el JavaScript del lado del cliente de Angular "hidrata" el contenido para hacerlo interactivo.
- Funcionamiento:
    - El usuario solicita una página (por ejemplo, /inicio).
    - El servidor renderiza la aplicación Angular utilizando el motor Angular Universal.
    - El HTML completamente renderizado se envía al usuario.
    - Angular toma el control y vuelve a adjuntar el código del lado del cliente al HTML renderizado por el servidor (hidratación), haciéndolo interactivo.

- Casos de usos:
    - Aplicaciones dinámicas que requieren SEO, como sitios de comercio electrónico.
    - Sitios que necesitan cargas de páginas rápidas con contenido dinámico.

### SSG (Static Site Generation)

- Se generan páginas HTML estáticas durante la compilación y se entregan directamente al usuario. Una vez entregada la página, Angular la hidrata para añadir interactividad.

- Funcionamiento:
    - La aplicación está construida y los archivos HTML se renderizan previamente en el momento de la compilación.
    - Estos archivos HTML estáticos son servidos por un servidor web.
    - Angular hidrata la página cuando se carga JavaScript en el navegador.

- Casos de usos:
    - Sitios estáticos, blogs, portafolios.
    - Sitios de documentación o páginas de marketing donde el contenido no cambia con frecuencia.

Referencia:
https://medium.com/@sehban.alam/server-side-rendering-ssr-vs-static-site-generation-ssg-vs-pre-rendering-with-hydration-in-49ff2ef59427#:~:text=Angular%20offers%20various%20rendering%20strategies,with%20these%20strategies%20is%20hydration.

[Añadir SSR](https://angular.dev/guide/ssr)
