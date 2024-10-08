import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PokemonDetailsModel} from "../../model/pokemonDetails.model";

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent {
  @Input() pokemon?: PokemonDetailsModel;
  public pokemonImg = '';
  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    this.pokemonImg = this.pokemon?.sprites.other.dream_world.front_default
      || this.pokemon?.sprites.other["official-artwork"].front_default || '';
  }

  closeModal() {
    this.close.emit();
  }
}
