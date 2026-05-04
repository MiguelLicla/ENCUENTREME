import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HorizontalTopbarComponent } from '../horizontal-topbar/horizontal-topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HorizontalTopbarComponent, 
    SidebarComponent, 
    FooterComponent, 
    RightsidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {
  isCondensed = false;
  constructor() { }
  ngOnInit(): void { }

  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 1024) {
      document.body.classList.toggle('menu-enable');
    }
    this.isCondensed = !this.isCondensed;
  }

  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }
}
