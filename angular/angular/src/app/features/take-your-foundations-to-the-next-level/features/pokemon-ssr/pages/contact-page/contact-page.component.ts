import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-ssr-contact-page',
  templateUrl: './contact-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './contact-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {
  private readonly _title = inject(Title);

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this._title.setTitle("Contact page")
  }
}
