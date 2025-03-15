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
  pages = input(0);
  currentPage = input<number>(1);

  activePage = linkedSignal(this.currentPage);

}
