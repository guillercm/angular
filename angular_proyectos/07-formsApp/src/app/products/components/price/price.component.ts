import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Subscription, interval, take } from 'rxjs';

@Component({
    selector: 'products-price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.css'],
    standalone: false
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public price:number = 0;

  public intervarl$?: Subscription;

  public simpleChangePrice?: SimpleChange;


  ngOnInit(): void {
    console.log('Componente HIJO: ngOnInit');
    this.intervarl$ = interval(1000).pipe(take(3)).subscribe( value => console.log(`Tick: ${value}`) );
  }

  ngOnChanges({ price }: SimpleChanges): void {
    console.log('Componente HIJO: ngOnChanges', price);
    this.simpleChangePrice = price;
  }
  ngOnDestroy(): void {
    console.log('Componente HIJO: ngOnDestroy');
    this.intervarl$?.unsubscribe();
  }

}
