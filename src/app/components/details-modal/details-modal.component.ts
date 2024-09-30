import {Component, Input} from '@angular/core';
import {PokemonModel} from "../../model/pokemon.model";

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent {
  @Input() pokemon?: PokemonModel;
}
