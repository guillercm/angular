import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { map, tap } from 'rxjs';
import { environment } from '@environments/environments';

@Component({
  selector: 'core-pdf',
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent {

  public urlPdf = toSignal<string>(
    inject(ActivatedRoute).data.pipe(
      tap(),
      map(data => environment.pdfPath.replace('{filename}', data['pdf']))
    )
  );

}
