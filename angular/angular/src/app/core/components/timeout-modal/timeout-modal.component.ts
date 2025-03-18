import { Component, inject, output, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeoutModalData } from './interfaces/data.interface';

@Component({
  selector: 'core-timeout-modal',
  imports: [],
  templateUrl: './timeout-modal.component.html',
  styleUrl: './timeout-modal.component.css'
})
export class TimeoutModalComponent {
  private readonly _activeModal = inject(NgbActiveModal);

  public data = signal<TimeoutModalData | null>(null);

  public clicked = output<string>();

  close() {
    this.clicked.emit("holaaaaaaaaaaaa");
    this._activeModal.close('Close click');
  }

  dismiss() {
    this._activeModal.dismiss('Cross click');
  }
}
