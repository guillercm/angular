import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { SessionService } from '@core/services/session/session.service';

@Component({
  selector: 'features-mapbox-checkbox',
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent implements OnInit {

  private readonly _sessionService = inject(SessionService);
  
  public identifier = input.required<string>();

  public checkedDefualt = input.required<boolean>();

  private _checked = signal<boolean>(false);
  protected checked = this._checked.asReadonly();

  public onInit = output<boolean>();

  public onChecked = output<boolean>();

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    const checked = this._sessionService.getItem<boolean>(this.identifier(), this.checkedDefualt());
    this._checked.set(checked);
    this.onChecked.emit(checked);
  }

  protected onChange(event: any) {
    const checked = event.currentTarget.checked;
    this._sessionService.setItem(this.identifier(), checked);
    this._checked.set(checked);
    this.onChecked.emit(checked);
  }

}
