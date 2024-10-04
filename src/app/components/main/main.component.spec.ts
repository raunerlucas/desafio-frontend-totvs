import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {PokemonService} from '../../services/pokemon.service';
import {MOCK_POKEMON, MOCK_POKEMON_DETAILS} from '../../mocks/pokemon-data.mock';

import {MainComponent} from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        {provide: PokemonService, useValue: jasmine.createSpyObj('PokemonService', ['getPokemon', 'getDetailsPokemon'])}
      ]
    })
      .compileComponents();

    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a Pokemon to localStorage', () => {
    const pokemon = MOCK_POKEMON;
    component.saveListToLocalStorage(pokemon);
    expect(localStorage.getItem('listOfSearch')).toContain(JSON.stringify(pokemon));
  });

  it('should handle search and save to localStorage', () => {
    const pokemon = MOCK_POKEMON;
    pokemonService.getPokemon.and.returnValue(of(pokemon));
    spyOn(component, 'openDetailsModal');
    component.onSearch('Pikachu');
    expect(component.openDetailsModal).toHaveBeenCalledWith(pokemon);
    expect(localStorage.getItem('listOfSearch')).toContain(JSON.stringify(pokemon));
  });

  it('should handle search error', () => {
    pokemonService.getPokemon.and.returnValue(of(null));
    component.onSearch('Unknown');
    expect(component.errorNotFound).toBeTrue();
  });

  it('should open details modal', () => {
    const pokemon = MOCK_POKEMON;
    const details= MOCK_POKEMON_DETAILS;
    pokemonService.getDetailsPokemon.and.returnValue(of(details));
    component.openDetailsModal(pokemon);
    expect(component.pokemon).toEqual(details);
  });
});
