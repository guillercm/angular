import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import 'animate.css';

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  imports: [CommonModule]
})
export class ImageComponent {

  url = input.required<string>()

  alt = input<string>()

  loading = input<"eager" | "lazy">("lazy")

  classes = input<string>()

  @ViewChild('img') public img!: ElementRef<HTMLImageElement>;

  protected hasLoaded = signal<boolean>(false);

  public imageWidth = input<number>(200)

  public imageHeight = input<number>(200)


  onLoad() {
    this.hasLoaded.set(true);
    const img = this.img.nativeElement;
    // this.imageWidth.set(img.width);
    // this.imageHeight.set(img.height);
  }

}
