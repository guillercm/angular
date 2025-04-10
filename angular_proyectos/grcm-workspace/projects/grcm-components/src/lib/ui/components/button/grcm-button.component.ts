import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { GrcmButtonVariants } from './interfaces/button-variants.type';
import { GrcmButtonType } from './interfaces/button-types.type';
import { GrcmButtonsSizes } from './interfaces/button-sizes.type';

@Component({
  selector: 'lib-grcm-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './grcm-button.component.html',
  styleUrl: './grcm-button.component.css'
})
export class GrcmButtonComponent {

  public label = input<string>('');

  public title = input<string>('');

  public disabled = input<boolean>(false);

  public link = input<string | null | undefined>(null);

  public type = input<GrcmButtonType>('button');

  public variant = input<GrcmButtonVariants>('primary');

  public outline = input<boolean>(false);

  public size = input<GrcmButtonsSizes>('default');

  public additionalClasses = input<string>('');

  public icon = input<string>('');

  public fontSizeIcon = input<1 | 2 | 3 | 4 | 5 | 6>(6);

  public clicked = output();

  protected readonly classes = computed(() => {
    return `w-100 btn btn-${(this.outline() ? 'outline-' : '') + this.variant() + (this.size() ? ` btn-${this.size()} ` : ' ') + this.additionalClasses()}`
  })

  click() {
    this.clicked.emit();
  }

}
