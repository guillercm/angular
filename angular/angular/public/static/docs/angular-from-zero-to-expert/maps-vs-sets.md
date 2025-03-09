# Mapas vs Sets de JavaScript

* [Referencia a Mapas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [Referencia a Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

| Característica               | `Map`                        | `Set`                 |
|------------------------------|------------------------------|-----------------------|
| **Almacena**                 | Pares clave-valor            | Valores únicos        |
| **Claves permitidas**        | Cualquier tipo de dato       | No aplica             |
| **Valores duplicados**       | Permitidos (por clave única) | No permitidos         |
| **Acceso por clave/valor**   | `.get(key)`                  | `.has(value)`         |
| **Orden**                    | Mantiene el orden            | Mantiene el orden     |
| **Uso común**                | Asociaciones clave-valor     | Listas sin duplicados |