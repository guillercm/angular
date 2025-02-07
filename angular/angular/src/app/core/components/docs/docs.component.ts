import { Component, OnInit, inject, input } from '@angular/core';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { environment } from '@environments/environments';
import { take } from 'rxjs';

@Component({
  selector: 'core-docs',
  imports: [],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css'
})
export class DocsComponent implements OnInit {

  private readonly _apiHandler = inject(ApiHandlerService);

  public readonly filename = input.required<string>();

  ngOnInit(): void {
    this.load();
  }

  load() {
    return this._apiHandler.get<string>(environment.docsPath.replace("{filename}", this.filename)).pipe(
        take(1)
      ).subscribe((content: string) => {
        console.log(content)
      })
  }

}
