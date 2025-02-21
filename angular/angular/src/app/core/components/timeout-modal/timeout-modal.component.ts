import { Component, inject, output, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'core-timeout-modal',
  imports: [],
  templateUrl: './timeout-modal.component.html',
  styleUrl: './timeout-modal.component.css'
})
export class TimeoutModalComponent {
  protected activeModal = inject(NgbActiveModal);

  name = signal<string>("");

  onClicked = output<string>();

  close() {
    this.onClicked.emit("holaaaaaaaaaaaa");
    this.activeModal.close('Close click');
  }
}
