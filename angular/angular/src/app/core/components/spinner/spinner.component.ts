import { Component, computed, effect, inject, signal } from '@angular/core';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';

@Component({
  selector: 'core-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  private readonly _interceptorService = inject(InterceptorService);

  protected readonly isLoading = computed( () => this._interceptorService.isLoadingSomeHttpRequest() )

}
