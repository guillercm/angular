import { Component } from '@angular/core';

@Component({
    selector: 'app-layout-page',
    templateUrl: './layout-page.component.html',
    styleUrl: './layout-page.component.css',
    standalone: false
})
export class LayoutPageComponent {
    public sidebarItems = [
        { label: 'Listado', icon: 'label', url: './list' },
        { label: 'Añadir', icon: 'add', url: './new-hero' },
        { label: 'Buscar', icon: 'search', url: './search' },
      ]
    
}
