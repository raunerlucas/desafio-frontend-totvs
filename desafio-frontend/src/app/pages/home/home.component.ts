import { Component } from '@angular/core';
import { MainComponent } from "../../components/templates/main/main.component";
import { FooterComponent } from "../../components/templates/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
