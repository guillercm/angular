import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { switchMap, take } from 'rxjs';
import { PageHttpStatus } from '@core/interfaces/http-status/page-http-status.interface';

@Component({
  selector: 'core-page-error',
  imports: [SharedImageComponent, SharedButtonComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export default class ErrorPageComponent implements OnInit {

  private readonly _activateRoute = inject(ActivatedRoute);

  private readonly _languageService = inject(LanguageService);

  private _httpStatus = signal<PageHttpStatus|null>(null);

  protected httpStatus = this._httpStatus.asReadonly();

  protected readonly getImgUrl = computed(() => `img/error-pages/${this.httpStatus()?.img}`)

  ngOnInit(): void {
    this._activateRoute.data.pipe(
      take(1),
      switchMap((data) => this._languageService.getPageHttpStatusErrors(data['http-status-code']))
    ).subscribe((httpStatus) => {
      this._httpStatus.set(httpStatus);
    })
  }
}
