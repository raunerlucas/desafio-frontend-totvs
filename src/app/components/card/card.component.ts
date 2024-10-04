import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PokemonModel} from "../../model/pokemon.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() pokemon!: PokemonModel;
  public pokemonImage = '';
  @Output() openDetails = new EventEmitter<void>();

  ngOnChanges() {
    this.pokemonImage = this.pokemon?.sprites.other.dream_world.front_default || this.pokemon?.sprites.other["official-artwork"].front_default || '';
  }

  onCardClick() {
    this.openDetails.emit();
  }
}
