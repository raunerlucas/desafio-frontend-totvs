import { Component } from '@angular/core';
import { PoFieldModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    PoFieldModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
