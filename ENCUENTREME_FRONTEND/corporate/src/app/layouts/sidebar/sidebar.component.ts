import { Component, OnInit, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule, 
    NgbCollapseModule, 
    SimplebarAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() mobileMenuButtonClicked = new EventEmitter();
  isSidebarOpen = false;

  constructor() { }

  ngOnInit(): void { }

  toggleMenu() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.mobileMenuButtonClicked.emit();
  }

  SidebarHide() {
    this.isSidebarOpen = false;
  }

  closeMobile() {
    if (window.innerWidth < 992) this.isSidebarOpen = false;
  }

  updateActive(event: any) {}
}
