import { ComponentFixture, TestBed } from '@angular/core/testing';

import PokemonPageComponent from './pokemon-page.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { PaginationService } from '@core/services/paginator/pagination.service';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

describe('PokemonPageComponent', () => {
  let component: PokemonPageComponent;
  let fixture: ComponentFixture<PokemonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPageComponent],
      providers: [ provideRouter([]),PokemonsService, provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
