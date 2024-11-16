import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import 'animate.css';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input() url!: string;

  @Input() alt: string = ''

  @Input() loading: "eager" | "lazy" = "lazy";

  @ViewChild('img') public img!: ElementRef<HTMLImageElement>;

  protected hasLoaded = false;

  protected imageWidth = 200;

  protected imageHeight = 200;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required.');
    // const img = new Image();
    // img.src = this.url;
    // img.onload = () => {
    //   this.imageWidth = img.naturalWidth;
    //   this.imageHeight = img.naturalHeight;
    //   this.showImg = true;
    // };
  }

  onLoad() {
    this.hasLoaded = true;
    const img = this.img.nativeElement;
    this.imageWidth = img.width;
    this.imageHeight = img.height;
  }

}
