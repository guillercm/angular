
### Testing

<br>

#### Tipos de pruebas

- Unitarias: Enfocada en partes atómicas.
    Funcionamientos específicos, como trabaja una función, una clase etc.

    - Pruebas atómicas simples.
    - Se recomienda no tener dependencia de otros componentes.
    - Debe de ser especializada en la pieza que estamos probando.

- Integración: Como funcionan diferentes elementos en conjunto, no deben de ser mayores a las unitarias.

- E2E - End to End: Como funciona un flujo de trabajo.
    - Flujo aislado de trabajo.
    
    - Prueban funcionalidades concretas.

    - Pruebas de casos improbables. Por ejemplo en un formulario en donde el usuario puede escribir lo que sea, probar que la aplicación no vaya a reventar en ningún caso. Inyecciones sql, caractéres especiales, etc.

<br>

#### Características de las pruebas

- Fáciles de escribir.

- Fáciles de leer, para posibles actualizaciones de ella en el futuro.

- Rápidas.

- Flexibles.

<br>

#### El triple "A"

- Arrange (Arreglar): Preparar el sujeto de pruebas.
    - Importaciones
    - Inicializaciones.

- Act (Actuar): 
    - Aplicar estímulos.
    - Llamar métodos.
    - Simular clicks. 

- Assert (Afirmar):
    - ¿Que a sucedido?
    - ¿Que es lo que realmente sucedió?

<br>

#### Coverage (Cobertura)

- Porcetaje de:
    - Lineas ejecutadas.
    - Ramas de decisión probadas.
    - Funciones / métodos invocados.
    - Condiciones evaluadas en ambos sentidos. (en un if, si se evaulua en el if, en el else etc)

- Lo ideal es hacer pruebas del 100% de la aplicación, pero si no es posible, por lo menos hacerlo de las partes más críticas de la aplicación.