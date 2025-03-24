import { Component, inject, input, output, signal } from '@angular/core';
import { ErrorModalData } from '@core/interfaces/errorModalData/errorModalData.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTranslatePipe } from "../../pipes/app-translate.pipe";

@Component({
  selector: 'core-http-error-modal',
  imports: [AppTranslatePipe],
  templateUrl: './http-error-modal.component.html',
  styleUrl: './http-error-modal.component.css'
})
export class HttpErrorModalComponent {
  private readonly _activeModal = inject(NgbActiveModal);

  public data = signal<ErrorModalData | null>(null);

  public clicked = output<string>();

  close() {
    this.clicked.emit("closed");
    this._activeModal.close('Close click');
  }

  dismiss() {
    this._activeModal.dismiss('Cross click');
  }
}
