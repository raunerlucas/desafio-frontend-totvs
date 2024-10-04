import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {MOCK_POKEMON} from "../../mocks/pokemon-data.mock";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.pokemon = MOCK_POKEMON;
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });


  it('should emit openDetails event on card click', () => {
    spyOn(component.openDetails, 'emit');
    component.onCardClick();
    expect(component.openDetails.emit).toHaveBeenCalled();
  });

  it('should update pokemonImage on changes', () => {
    component.pokemon = MOCK_POKEMON;
    component.ngOnChanges();
    expect(component.pokemonImage).toBe('https://example.com/pikachu-dream.png');
  });
});
