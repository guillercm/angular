import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-pdf',
  imports: [],
  templateUrl: './shared-pdf.component.html',
  styleUrl: './shared-pdf.component.css'
})
export class SharedPdfComponent {

  private readonly _domSanitizer = inject(DomSanitizer);

  public urlPdf = input.required<string>();

  protected readonly getUrlPdf = computed(() => this._domSanitizer.bypassSecurityTrustResourceUrl(this.urlPdf() + "#navpanes=0") )

}
