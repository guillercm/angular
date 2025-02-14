import { Component, Injectable, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataModal } from './interfaces/data-modal.interface';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Hello, {{ name }}!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
	protected activeModal = inject(NgbActiveModal);

	@Input() name!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _modalService = inject(NgbModal);

  open<T>(data: DataModal<T>): NgbModalRef {
	const {component, inputs, options} = data;
    const modalRef = this._modalService.open(component, options);
	if (inputs)
	Object.keys(inputs).forEach((key) => {
		modalRef.componentInstance[key] = (inputs as GenericObject)[key];
	});
	return modalRef;
  }

      // https://ng-bootstrap.github.io/#/components/modal/examples
}
