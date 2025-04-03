import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'features-flex-css',
  imports: [CommonModule],
  templateUrl: './flex-css.component.html',
  styleUrl: './flex-css.component.css'
})
export class FlexCssComponent {

  protected readonly examples = signal([
    {
      index: 1,
      title: "Estilos por defecto",
      code: `#ejemplo .contenedor { display: flex; justify-content: stretch; }`,
      childs: 8
    },
    {
      index: 2,
      title: "Flex-wrap",
      code: `#ejemplo .contenedor { display: flex; flex-wrap: wrap; }`,
      childs: 8
    },
    {
      index: 3,
      title: "Columnas",
      code: `#ejemplo .contenedor { display: flex; flex-direction: column; }`,
      childs: 3
    },
    {
      index: 4,
      title: "Columnas reversas",
      code: `#ejemplo .contenedor { display: flex; flex-direction: column-reverse; }`,
      childs: 3
    },
    {
      index: 5,
      title: "Filas reversas",
      code: `#ejemplo .contenedor { display: flex; flex-direction: row-reverse; }`,
      childs: 3
    },
    {
      index: 6,
      title: "Justify-content: flex-start",
      code: `#ejemplo .contenedor { display: flex; justify-content: flex-start; }`,
      childs: 3
    },
    {
      index: 7,
      title: "Justify-content: flex-end",
      code: `#ejemplo .contenedor { display: flex; justify-content: flex-end; }`,
      childs: 3
    },
    {
      index: 8,
      title: "Justify-content: center",
      code: `#ejemplo .contenedor { display: flex; justify-content: center; }`,
      childs: 3
    },
    {
      index: 9,
      title: "Justify-content: space-between",
      code: `#ejemplo .contenedor { display: flex; justify-content: space-between; }`,
      childs: 4
    }
  ]);

}
