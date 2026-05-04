import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TwoColumnSidebarComponent } from '../two-column-sidebar/two-column-sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-two-column',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TopbarComponent, 
    SidebarComponent, 
    TwoColumnSidebarComponent, 
    FooterComponent, 
    RightsidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.scss']
})
export class TwoColumnComponent implements OnInit {
  isCondensed = false;
  constructor() { }
  ngOnInit(): void { }

  onToggleMobileMenu() {
    document.body.classList.toggle('twocolumn-panel');
    this.isCondensed = !this.isCondensed;
  }
}
