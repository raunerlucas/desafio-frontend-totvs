import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchFieldComponent} from './search-field.component';
import {PokemonService} from '../../services/pokemon.service';
import {of, throwError} from 'rxjs';

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['getPokemonNames']);

    await TestBed.configureTestingModule({
      imports: [SearchFieldComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemonNames and update suggestions on search term change', () => {
    const mockSuggestions = ['Pikachu', 'Charmander'];
    pokemonService.getPokemonNames.and.returnValue(of(mockSuggestions));

    component.searchTerm = 'Pika';
    component.onSearchChange();

    expect(pokemonService.getPokemonNames).toHaveBeenCalledWith('Pika');
    expect(component.pokemonSuggestions).toEqual(mockSuggestions);
    expect(component.showSuggestions).toBeTrue();
  });

  it('should handle error when getPokemonNames fails', () => {
    const consoleSpy = spyOn(console, 'error');
    pokemonService.getPokemonNames.and.returnValue(throwError('error'));

    component.searchTerm = 'Pika';
    component.onSearchChange();

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter sugestões:', 'error');
    expect(component.pokemonSuggestions).toEqual([]);
    expect(component.showSuggestions).toBeFalse();
  });

  it('should emit search event and clear search term on search', () => {
    spyOn(component.search, 'emit');

    component.searchTerm = 'Pikachu';
    component.onSearch();

    expect(component.search.emit).toHaveBeenCalledWith('Pikachu');
    expect(component.searchTerm).toBe('');
    expect(component.showSuggestions).toBeFalse();
  });

  it('should update search term and call onSearch on suggestion click', () => {
    spyOn(component, 'onSearch');

    component.onSuggestionClick('Charmander');

    expect(component.searchTerm).toBe('Charmander');
    expect(component.onSearch).toHaveBeenCalled();
  });
});
