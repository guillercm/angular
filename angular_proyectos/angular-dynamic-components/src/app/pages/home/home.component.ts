import { Component, ComponentRef, ElementRef, inject, isSignal, OnInit, OutputEmitterRef, TemplateRef, viewChild, ViewContainerRef, InputSignal, ContentChild } from '@angular/core';
import { WeatherContentComponent } from "../../widget/weather-content.component";
import { WidgetComponent } from "../../widget/widget.component";


@Component({
  selector: 'app-home',
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
        <button (click)="destroyComponent(components.length - 1)" class="destroy">Destroy Component</button>
      </section>
    </main>
  `,
  imports: [WeatherContentComponent]
})
export class HomeComponent implements OnInit {
  container = viewChild('container', { read: ViewContainerRef });
  content = viewChild<TemplateRef<unknown>>('content');

  // Array de referencias a componentes
  components: ComponentRef<WidgetComponent>[] = [];

  ngOnInit(): void {
    this.createComponent();
  }

  isInput(instance: object, prop: string): boolean {
    const ctor = instance.constructor as any;
    const inputs = ctor.ɵcmp?.inputs || {};
    return Object.prototype.hasOwnProperty.call(inputs, prop);
  }

  isOutput(value: any) {
    return value instanceof OutputEmitterRef;
  }


  createComponent() {
    const viewContainer = this.container();
    const template = this.content();

    if (viewContainer && template) {
  // public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  // <ng-container #controlView></ng-container>
      const componentRef = viewContainer.createComponent(WidgetComponent);
      const weatherRef = componentRef.instance.controlView().createComponent(WeatherContentComponent);

      // const contentView = viewContainer.createEmbeddedView(template);
      // const componentRef = viewContainer.createComponent(WidgetComponent, {
      //   projectableNodes: [contentView.rootNodes]
      // });

      componentRef.setInput('title', `Weather #${this.components.length + 1}`);
      componentRef.setInput('description', 'Currently in Vienna:');

      const entries = Object.entries(componentRef.instance);
      for (const [key, value] of entries) {
        if (this.isInput(componentRef.instance, key)) {
          console.log("input", value);
        } else if (this.isOutput(value)) {
          console.log("output", value);
        }
      }
      console.log(entries)

      // Suscripción al evento `closed` para eliminarse a sí mismo
      componentRef.instance.closed.subscribe(() => {
        const index = this.components.indexOf(componentRef);
        if (index !== -1) {
          this.destroyComponent(index);
        }
      });

      this.components.push(componentRef);
    }
  }

  destroyComponent(index: number) {
    const ref = this.components[index];
    if (ref) {
      ref.destroy();
      this.components.splice(index, 1);
    }
  }

  clearAll() {
    for (const ref of this.components) {
      ref.destroy();
    }
    this.components = [];
    this.container()?.clear();
  }
}
