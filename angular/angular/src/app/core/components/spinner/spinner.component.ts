import { Component, effect, inject, signal } from '@angular/core';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';

@Component({
  selector: 'core-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  private readonly _interceptorService = inject(InterceptorService);

  private _isLoading = signal<boolean>(false);

  protected readonly isLoading = this._isLoading.asReadonly();

  effectLoader = effect(() => {
    this._isLoading.set( this._interceptorService.isLoadingSomeHttpRequest() )
  })
}
