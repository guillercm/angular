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

  private _isChecked = signal<boolean>(false);
  protected isChecked = this._isChecked.asReadonly();

  public init = output<boolean>();

  public checked = output<boolean>();

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    const checked = this._sessionService.getItem<boolean>(this.identifier(), this.checkedDefualt());
    this._isChecked.set(checked);
    this.checked.emit(checked);
  }

  protected onChange(event: any) {
    const checked = event.currentTarget.checked;
    this._sessionService.setItem(this.identifier(), checked);
    this._isChecked.set(checked);
    this.checked.emit(checked);
  }

}
