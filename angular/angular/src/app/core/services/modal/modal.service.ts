import { Component, ComponentRef, ElementRef, EnvironmentInjector, Injectable, Injector, Input, OutputEmitterRef, OutputRefSubscription, createComponent, inject, input, output, signal } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataModal } from './interfaces/data-modal.interface';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { AppComponent } from '../../../app.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Hello, {{ name() }}!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="close()">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
  protected activeModal = inject(NgbActiveModal);

  name = signal<string>("");

  onClicked = output<string>();

  close() {
    this.onClicked.emit("holaaaaaaaaaaaa");
    this.activeModal.close('Close click');
  }

}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _modalService = inject(NgbModal);


  open<T>(data: DataModal<T>): NgbModalRef {
    const { component, destroyRef, args, options } = data;
    const modalRef: NgbModalRef = this._modalService.open(component, options);
    if (args)
      Object.keys(args).forEach((key) => {
        const property = modalRef.componentInstance[key];
        if (typeof property === 'function') {
          property.set((args as GenericObject)[key]);
        } else if (typeof property === 'object' && property instanceof OutputEmitterRef) {
          const subs: OutputRefSubscription = property.subscribe((args as GenericObject)[key])
          destroyRef.onDestroy(() => subs.unsubscribe())
        }
      });
    return modalRef;
  }

  // https://ng-bootstrap.github.io/#/components/modal/examples
}
