import {Component, Input} from '@angular/core';
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
}
