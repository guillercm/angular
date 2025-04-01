import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-ssr-about-page',
  templateUrl: './about-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './about-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent implements OnInit {

  private readonly _title = inject(Title);
  private readonly _meta = inject(Meta);

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this._title.setTitle("About page")
    this._meta.updateTag({name: 'description', content: 'Página de about'})
    this._meta.updateTag({name: 'og:title', content: 'Página de about'})
    this._meta.updateTag({name: 'keywords', content: 'about,pokemon,angular'})
  }
}
