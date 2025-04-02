import {
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RepeatPipe } from "@shared/pipes/repeat/repeat.pipe";

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, RepeatPipe],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  public pages = input(0);
  public currentPage = input<number>(1);

  public activePage = linkedSignal(this.currentPage);

}
