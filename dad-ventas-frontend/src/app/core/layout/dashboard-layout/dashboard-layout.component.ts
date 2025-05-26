import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  imports: [
    RouterOutlet, RouterModule, CommonModule
  ],
  styleUrls: ['./dashboard-layout.component.scss']

})
export class DashboardLayoutComponent {
  darkMode = false;
  userDropdownOpen = false;

  toggleDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeDropdown() {
    this.userDropdownOpen = false;
  }
}
