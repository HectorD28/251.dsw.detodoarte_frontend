import { Component} from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { ExpoComponent } from '../expo/expo/expo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ExpoComponent
        
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {




}
