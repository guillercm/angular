import { Component, inject, output, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'core-http-error-modal',
  imports: [],
  templateUrl: './http-error-modal.component.html',
  styleUrl: './http-error-modal.component.css'
})
export class HttpErrorModalComponent {
  private readonly _activeModal = inject(NgbActiveModal);

  public title = signal<string>("");

  public message = signal<string>("");

  public clicked = output<string>();

  close() {
    this.clicked.emit("holaaaaaaaaaaaa");
    this._activeModal.close('Close click');
  }

  dismiss() {
    this._activeModal.dismiss('Cross click');
  }
}
