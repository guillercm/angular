import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemon: SimplePokemon = {
  id: "1", name: "bulbasaur"
}

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput("pokemon", mockPokemon)
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Simple Pokemon signal inputValue', () => {
    const pokemon = component.pokemon!;
    expect(pokemon).toBeDefined();
    expect(pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    expect(compiled.querySelector("shared-image")).not.toBeNull();
    const title = compiled.querySelector("h2")!;
    expect(title).not.toBeNull();
    expect(title.textContent?.trim()).toBe(mockPokemon.name)
  });

  it('should have the proper ng-reflect-router-link', ()=> {
    expect(compiled.querySelector("div")?.getAttribute("ng-reflect-router-link")?.includes(mockPokemon.name)).toBeTruthy();
  });
});
