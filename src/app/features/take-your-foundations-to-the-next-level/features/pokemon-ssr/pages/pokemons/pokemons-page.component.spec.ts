import { ComponentFixture, TestBed } from '@angular/core/testing';

import PokemonsPageComponent from './pokemons-page.component';
import { provideRouter } from '@angular/router';
import { PaginationService } from '@core/services/paginator/pagination.service';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonsPageComponent', () => {
  let component: PokemonsPageComponent;
  let fixture: ComponentFixture<PokemonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsPageComponent],
      providers: [PaginationService, provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
