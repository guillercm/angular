import { Component, computed, inject } from '@angular/core';
import { DataHttpRequest } from '@core/interceptors/interfaces/data-http-request.interface';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';

@Component({
  selector: 'core-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  private readonly _interceptorService = inject(InterceptorService);

  protected readonly isLoading = computed<boolean>(() =>
    this._interceptorService.dataHttpRequests().some((value: DataHttpRequest) => value.state === 'loading' && value.context.actionsWhileLoadingHttpRequest?.includes('spinner'))
  );

}
