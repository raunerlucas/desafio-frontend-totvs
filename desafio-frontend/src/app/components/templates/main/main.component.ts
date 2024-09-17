import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    PoModule,
    FormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  searchTerm: string = "";

  onSearch() {
    console.log(this.searchTerm);
  }
}
