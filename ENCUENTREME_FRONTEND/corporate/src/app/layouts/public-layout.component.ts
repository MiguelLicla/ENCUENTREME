import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent implements OnInit {
  mobileOpen = false;
  year = new Date().getFullYear();
  constructor() { }
  ngOnInit(): void { }
}
