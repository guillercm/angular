import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { I18nSelectPipeComponent } from "../../components/i18n-select-pipe/i18n-select-pipe.component";
import { I18nPluralPipeComponent } from "../../components/i18n-plural-pipe/i18n-plural-pipe.component";
import { KeyValuePipeComponent } from "../../components/key-value-pipe/key-value-pipe.component";
import { AsyncPipeComponent } from "../../components/async-pipe/async-pipe.component";
import { CustomPipesComponent } from "../../components/custom-pipes/custom-pipes.component";

@Component({
  selector: 'features-pipes-home-page',
  imports: [CommonModule, NgbAccordionModule, I18nSelectPipeComponent, I18nPluralPipeComponent, KeyValuePipeComponent, AsyncPipeComponent, CustomPipesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

  protected readonly name = "guiLLeRmo";

  private _customDate = signal(new Date());

  protected readonly date = this._customDate.asReadonly();

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this._customDate.set(new Date());
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  protected readonly clients: string[] = ['Maria','Pedro','Fernando', 'Hernando', 'Eduardo', 'Melissa', 'Natalia'];

  protected readonly pipes = ['Pipes para texto', 'Pipes para números', 'Pipes para fechas', 'Slice pipe', 'Pipes no comunes', 'Pipes personalizados'];

}
