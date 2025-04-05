import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { provideRouter } from '@angular/router';


const mockPokemons: SimplePokemon[] = [
  {
    id: '1', name: 'bulbasaur'
  },
  { id: '2', name: 'ivysaur' }
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

  });

  it('should create', () => {
    fixture.componentRef.setInput("pokemons", []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list', () => {
    fixture.componentRef.setInput("pokemons", mockPokemons);
    fixture.detectChanges();
    // console.log(compiled.querySelectorAll("pokemon-card"))
    expect(compiled.querySelectorAll("pokemon-card").length).toBe(mockPokemons.length)
  });

  it('should render not pokemon', () => {
    fixture.componentRef.setInput("pokemons", []);
    fixture.detectChanges();
    expect(compiled.textContent).toContain("No hay pokémons")
  })
});
