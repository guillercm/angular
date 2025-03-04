import { computed, inject, Pipe, PipeTransform, Signal } from '@angular/core';
import { LoaderInterceptorData } from '@core/interceptors/interfaces/loader-interceptor-data.interface';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';

@Pipe({
  name: 'stateHttpRequest'
})
export class StateHttpRequestPipe implements PipeTransform {

  private readonly _interceptorService = inject(InterceptorService);

  transform(id: string): Signal<"loading" | "error" | null> {
    return computed(() => {
      const isLoading = this._interceptorService.loadingHttpRequests().some((value: LoaderInterceptorData) => value.context.id === id);
      if (isLoading) return "loading";
      const data = this._interceptorService.httpErrorData();
      if (data && data.context.id === id) {
        return "error"
      }
      return null;
    })
  }

}
