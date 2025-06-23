import { Component } from '@angular/core';
import {ListComponent} from "../modules/productos/list/list.component";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    ListComponent
  ],

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Puedes tener lógica específica de esta página aquí
}
