import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild('input') public input!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) {
    
  }
  

  searchTag(newTag: string) {
    console.log({newTag, newTagChild: this.input.nativeElement.value})
    this.gifsService.searchTag(newTag);
    this.input.nativeElement.value = "";
  }

}
