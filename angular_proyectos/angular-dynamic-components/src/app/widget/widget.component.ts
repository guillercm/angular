import { Component, input, output, signal, viewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: "app-widget",
  standalone: true,
  template: `
    <div class="widget-header" [style.background-color]="bgColor">
      <div class="widget-title">{{ title() }}</div>
      <div class="widget-sub-title">{{ description() }}</div>
      <button class="action" (click)="closed.emit()">close</button>
    </div>
    <div class="widget-content">
      <ng-container #controlView></ng-container>
    </div>
    <div class="widget-actions">
      <ng-content select="[actions]">
        <p class="no-actions">No actions...</p>
      </ng-content>
    </div>
  `,
})
export class WidgetComponent {

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  bgColor =  '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
  title = input("__Widget__");
  description = input("__Widget description__");

  closed = output<void>();

  hola = signal("hola")
}
