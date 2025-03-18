import 'animate.css';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ImageState } from './interfaces/image-states.type';
import { SkeletonTextDirective } from '@shared/directives/skeleton/skeleton-text.directive';

import { TranslatePipe } from '@ngx-translate/core';
//
// https://www.youtube.com/watch?v=_JFTg4kL0CY
// https://angular.dev/guide/image-optimization

@Component({
  selector: 'shared-image',
  templateUrl: './shared-image.component.html',
  styleUrl: './shared-image.component.css',
  imports: [CommonModule, NgOptimizedImage, SkeletonTextDirective, TranslatePipe, TranslatePipe]
})
export class SharedImageComponent {

  public url = input.required<string>()

  public alt = input<string>("default")

  public loading = input<"eager" | "lazy">("lazy")

  public classes = input<string>()

  public skeleton = input<boolean>(false)

  protected state = signal<ImageState>('loading');

  onLoad() {
    this.state.set('loaded');
  }

  onError() {
    // console.log(this.url())
    this.state.set('error');
  }

}
