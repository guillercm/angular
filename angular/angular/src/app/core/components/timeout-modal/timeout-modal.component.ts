import { Component, inject, output, signal } from '@angular/core';
import { ErrorModalData } from '@core/interfaces/errorModalData/errorModalData.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'core-timeout-modal',
  imports: [],
  templateUrl: './timeout-modal.component.html',
  styleUrl: './timeout-modal.component.css'
})
export class TimeoutModalComponent {
  private readonly _activeModal = inject(NgbActiveModal);

  public data = signal<ErrorModalData | null>(null);

  public clicked = output<string>();

  close() {
    this.clicked.emit("holaaaaaaaaaaaa");
    this._activeModal.close('Close click');
  }

  dismiss() {
    this._activeModal.dismiss('Cross click');
  }
}
