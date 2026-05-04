import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RootReducerState } from '../store';
import { Store } from '@ngrx/store';

// Import local layout parts as standalone (I will convert them next)
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { TwoColumnComponent } from './two-column/two-column.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    VerticalComponent,
    HorizontalComponent,
    TwoColumnComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    RightsidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layoutType!: string;

  constructor(private store: Store<RootReducerState>) { }

  ngOnInit(): void {
    this.store.select('layout').subscribe((data) => {
      this.layoutType = data.LAYOUT;
      document.documentElement.setAttribute('data-layout', data.LAYOUT);
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_MODE);
      document.documentElement.setAttribute('data-layout-width', data.LAYOUT_WIDTH);
      document.documentElement.setAttribute('data-layout-position', data.LAYOUT_POSITION);
      document.documentElement.setAttribute('data-topbar', data.TOPBAR);
      data.LAYOUT == "vertical" || data.LAYOUT == "twocolumn" ? document.documentElement.setAttribute('data-sidebar', data.SIDEBAR_COLOR) : '';
      data.LAYOUT == "vertical" || data.LAYOUT == "twocolumn" ? document.documentElement.setAttribute('data-sidebar-size', data.SIDEBAR_SIZE) : '';
      data.LAYOUT == "vertical" || data.LAYOUT == "twocolumn" ? document.documentElement.setAttribute('data-sidebar-image', data.SIDEBAR_IMAGE) : '';
      data.LAYOUT == "vertical" || data.LAYOUT == "twocolumn" ? document.documentElement.setAttribute('data-layout-style', data.SIDEBAR_VIEW) : '';
      document.documentElement.setAttribute('data-preloader', data.DATA_PRELOADER)
      document.documentElement.setAttribute('data-sidebar-visibility', data.SIDEBAR_VISIBILITY);
    });
  }

  isVerticalLayoutRequested() { return this.layoutType === 'vertical'; }
  isSemiboxLayoutRequested() { return this.layoutType === 'semibox'; }
  isHorizontalLayoutRequested() { return this.layoutType === 'horizontal'; }
  isTwoColumnLayoutRequested() { return this.layoutType === 'twocolumn'; }
}
