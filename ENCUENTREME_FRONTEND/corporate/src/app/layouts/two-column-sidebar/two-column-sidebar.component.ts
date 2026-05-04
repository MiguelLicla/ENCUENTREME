import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-two-column-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SimplebarAngularModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './two-column-sidebar.component.html',
  styleUrls: ['./two-column-sidebar.component.scss']
})
export class TwoColumnSidebarComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
