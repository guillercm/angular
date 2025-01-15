import { Component, Input } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'shared-menu-item',
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {

  @Input() label!: string;
  @Input() menu: MenuItem[] = [];
}
