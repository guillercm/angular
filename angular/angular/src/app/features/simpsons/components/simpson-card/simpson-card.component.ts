import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SharedImageComponent } from '@shared/components/image/shared-image.component';
import { SkeletonGlowDirective } from '@shared/directives/skeleton/skeleton-glow.directive';
import { SkeletonTextDirective } from '@shared/directives/skeleton/skeleton-text.directive';
import { FilledTextPipe } from '@shared/pipes/filled-text/filled-text.pipe';

@Component({
  selector: 'features-simpson-card',
  imports: [CommonModule, SharedImageComponent, SkeletonGlowDirective, SkeletonTextDirective, FilledTextPipe],
  templateUrl: './simpson-card.component.html',
  styleUrl: './simpson-card.component.css'
})
export class SimpsonCardComponent {

  public simpson = input<Simpson | null>(null);

  protected skeleton = computed<boolean>(() => !this.simpson())

}
