import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PoButtonModule, PoFieldModule} from "@po-ui/ng-components";
import {PokemonDetailsModel} from "../../model/pokemonDetails.model";

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PoFieldModule,
    PoButtonModule
  ],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent {
  @Input() pokemon?: PokemonDetailsModel;
  protected pokemonImg = '';
  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    this.pokemonImg = this.pokemon?.sprites.other.dream_world.front_default
      || this.pokemon?.sprites.other["official-artwork"].front_default || '';
  }

  closeModal() {
    this.close.emit();
  }
}
