import { Component, ComponentRef, ElementRef, inject, OnInit, TemplateRef, viewChild, ViewContainerRef } from "@angular/core";
import { WidgetComponent } from "./widget/widget.component";
import { WeatherContentComponent } from "./widget/weather-content.component";
@Component({
    selector: "app-root",
    template: `
    <img class="logo" src="./logo.svg" alt="Decoded Frontend" />
    <h1 class="page-title">Dynamic Components</h1>
    <ng-template #content>
      <app-weather-content />
    </ng-template>
    <main id="content">
      <ng-container #container></ng-container>
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
        <button (click)="destroyComponent()" class="destroy">Destroy Component</button>
      </section>
    </main>
  `,
    imports: [WeatherContentComponent]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.createComponent();
  }
  container = viewChild('container', { read: ViewContainerRef });
  content = viewChild<TemplateRef<unknown>>('content');
  #componentRef?: ComponentRef<WidgetComponent>;
  createComponent() {
    this.container()?.clear();
    const contentView = this.container()?.createEmbeddedView(this.content()!)
    console.log(contentView)
    this.#componentRef = this.container()?.createComponent(WidgetComponent, {
      projectableNodes: [
        contentView?.rootNodes!
      ]
    })
    this.#componentRef?.setInput('title', 'Weather');
    this.#componentRef?.setInput('description', 'Currently in Vienna:');
    console.log(this.#componentRef?.instance)
    this.#componentRef?.instance.closed.subscribe(
      () => this.#componentRef?.destroy()
    )
  }
  destroyComponent() {
    this.container()?.clear();
  }
}
