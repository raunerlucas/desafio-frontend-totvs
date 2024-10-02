import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PokemonModel} from "../../model/pokemon.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-collapsable-card',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './collapsable-card.component.html',
  styleUrl: './collapsable-card.component.css'
})
export class CollapsableCardComponent {
  @Input() pokemon!: PokemonModel;
  protected pokemonImage = '';
  @Output() openDetails = new EventEmitter<void>();

  ngOnChanges() {
    this.pokemonImage = this.pokemon?.sprites.other.dream_world.front_default || this.pokemon?.sprites.other["official-artwork"].front_default ;
  }

  onCardClick() {
    this.openDetails.emit();
  }
}
