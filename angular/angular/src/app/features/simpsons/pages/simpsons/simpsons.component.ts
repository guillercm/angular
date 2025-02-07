import { Component, inject } from '@angular/core';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { take } from 'rxjs';

@Component({
  selector: 'features-simpsons',
  imports: [],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {
  private readonly _simpsonsServices = inject(SimpsonsService);
  

  ngOnInit(): void {
    this._simpsonsServices.getSimpsonById(18).pipe(take(1)).subscribe((simpson:Simpson) => {
      console.log(simpson)
    })
    this._simpsonsServices.getSimpsons().pipe(take(1)).subscribe((simpsons:Simpson[]) => {
      console.log(simpsons)
    })
  }
}
