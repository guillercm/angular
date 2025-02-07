import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';
import { DataCode } from '@shared/components/code-block/interfaces/data-code.interface';

@Component({
  selector: 'features-configuration-use',
  imports: [CodeBlockComponent],
  templateUrl: './configuration-use.component.html',
  styleUrl: './configuration-use.component.css'
})
export default class ConfigurationUseComponent {
  protected readonly codeJson = `{
    \n "app": {
        "hello": "hello {{value}}",
        "title": "Translation Demo"
      }
}`
  
  protected readonly example: DataCode[] = [
    {
      label: 'your-component.ts',
      code: `import {Component} from '@angular/core';
    import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
    
    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [TranslatePipe, TranslateDirective],
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class YourComponent {
      ...
      private _name = signal<string>("Guille");
      public name = this._name.asReadonly();
    }`
    },
    {
      label: 'app.template.html',
      code: `<div>{{ 'app.hello' | translate }}</div>
<div>{{ 'app.hello' | translate:{value: name()} }}</div>
<div translate [translateParams]="{value: name()}">app.hello</div>
<div [innerHTML]="'app.hello' | translate:{value: name()}"></div>`,
    },
    {
      label: 'render',
      code: `hello {{value}}
hello Guille
hello Guille
hello Guille`
    }
  ]
}
