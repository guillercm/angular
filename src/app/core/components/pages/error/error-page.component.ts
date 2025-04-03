import { ActivatedRoute } from '@angular/router';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { AppTranslatePipe } from '@core/pipes/app-translate.pipe';
import { Component, computed, inject } from '@angular/core';
import { map, take } from 'rxjs';
import { PageHttpStatus } from '@core/interfaces/http-status/page-http-status.interface';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'core-page-error',
  imports: [SharedImageComponent, SharedButtonComponent, AppTranslatePipe],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export default class ErrorPageComponent {

  protected readonly getImgUrl = computed(() => `img/error-pages/${this.pageData()?.img}`)

  protected pageData = toSignal<PageHttpStatus | undefined>(
    inject(ActivatedRoute).data.pipe(
      take(1),
      map(({httpStatus}) => inject(AppConfigService).config().errors.httpStatus[httpStatus].data.page)
    )
  );

}
