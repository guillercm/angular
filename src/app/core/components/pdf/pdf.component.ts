import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { environment } from '@environments/environments';
import { SharedPdfComponent } from "@shared/components/shared-pdf/shared-pdf.component";

@Component({
  selector: 'core-pdf',
  imports: [CommonModule, SharedPdfComponent],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export default class PdfComponent {

  protected readonly isPlatformBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public urlPdf = toSignal<string>(
    inject(ActivatedRoute).data.pipe(
      tap(),
      map(({pdf}) => environment.pdfPath.replace('{filename}', pdf))
    )
  );

}
