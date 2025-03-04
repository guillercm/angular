import { Injectable, OutputEmitterRef, OutputRefSubscription, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataModal } from './interfaces/data-modal.interface';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _modalService = inject(NgbModal);

  open<T>(data: DataModal<T>): NgbModalRef {
    const { component, destroyRef, args, options } = data;
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
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
