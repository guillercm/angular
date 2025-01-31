import { Component } from '@angular/core';
import { HeavyLoadersFastComponent } from '@shared/heavy-loaders/heavy-loaders-fast.component';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import { NormalComponent } from './components/normal.component';
import { DeferComponent } from './components/defer.component';
import { DeferImmediateComponent } from './components/defer-immediate.component';

@Component({
  imports: [CommonModule, HeavyLoadersFastComponent, TitleComponent, NormalComponent, DeferComponent, DeferImmediateComponent],
  templateUrl: './defer-options.component.html',
  selector: 'app-defer-options',
  styleUrl: './defer-options.component.css'
})
export default class DeferOptionsComponent {
  explicacion = `
  Sin defer: Encabezado y navegación,
  ya que son esenciales para la navegación del usuario.

  @defer (on immediate): Contenido principal del blog,
  para que el usuario pueda comenzar a leer rápidamente.

  @defer (on idle) (opción por defecto): Comentarios y widgets adicionales,
  que no son esenciales para la experiencia inicial del usuario
  y pueden cargarse cuando el navegador está en estado de inactividad.
  `;
}
