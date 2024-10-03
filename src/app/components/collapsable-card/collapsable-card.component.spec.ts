import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollapsableCardComponent} from './collapsable-card.component';
import {MOCK_POKEMON} from "../../testing/mock-pokemon-data";

describe('CollapsableCardComponent', () => {
  let component: CollapsableCardComponent;
  let fixture: ComponentFixture<CollapsableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsableCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollapsableCardComponent);
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
