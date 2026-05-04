import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { getSidebarSize } from 'src/app/store/layouts/layout-selector';

import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TopbarComponent, 
    SidebarComponent, 
    FooterComponent, 
    RightsidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit {

  isCondensed = false;
  getsize: any;

  constructor(private eventService: EventService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<RootReducerState>) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (document.documentElement.getAttribute('data-preloader') == 'enable') {
        if (event instanceof NavigationEnd) {
          if (event.url !== '/disabled-route') {
            (document.getElementById("preloader") as HTMLElement).style.opacity = "1";
            (document.getElementById("preloader") as HTMLElement).style.visibility = "";
            setTimeout(() => {
              (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
              (document.getElementById("preloader") as HTMLElement).style.visibility = "hidden";
            }, 1000);
          } else {
            (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
            (document.getElementById("preloader") as HTMLElement).style.visibility = "hidden";
          }
        }
      }
    });

    this.handlePreloader(this.activatedRoute.snapshot.routeConfig?.path);
    if (document.documentElement.getAttribute('data-sidebar-size') == 'lg') {
      this.store.select(getSidebarSize).subscribe((size) => {
        this.getsize = size
        })
      window.addEventListener('resize', () => {
        var self = this;
        if (document.documentElement.clientWidth <= 767) {
          document.documentElement.setAttribute('data-sidebar-size', '');
          document.querySelector('.hamburger-icon')?.classList.add('open')
        }
        else if (document.documentElement.clientWidth <= 1024) {
          document.documentElement.setAttribute('data-sidebar-size', 'sm');
          document.querySelector('.hamburger-icon')?.classList.add('open')
        }
        else if (document.documentElement.clientWidth >= 1024) {
          if (document.documentElement.getAttribute('data-layout-width') == 'fluid') {
            document.documentElement.setAttribute('data-sidebar-size', self.getsize);
            document.querySelector('.hamburger-icon')?.classList.remove('open')
          }
        }
      })
    }
  }

  private handlePreloader(route: any) {
    if (route !== '/disabled-route') {
      (document.getElementById("preloader") as HTMLElement).style.opacity = "1";
      (document.getElementById("preloader") as HTMLElement).style.visibility = "";
      setTimeout(() => {
        (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
        (document.getElementById("preloader") as HTMLElement).style.visibility = "hidden";
      }, 1000);
    } else {
      (document.getElementById("preloader") as HTMLElement).style.opacity = "0";
      (document.getElementById("preloader") as HTMLElement).style.visibility = "hidden";
    }
  }

  onToggleMobileMenu() {
    const currentSIdebarSize = document.documentElement.getAttribute("data-sidebar-size");
    if (document.documentElement.clientWidth >= 767) {
      if (currentSIdebarSize == null) {
        (document.documentElement.getAttribute('data-sidebar-size') == null || document.documentElement.getAttribute('data-sidebar-size') == "lg") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg')
      } else if (currentSIdebarSize == "md") {
        (document.documentElement.getAttribute('data-sidebar-size') == "md") ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'md')
      } else {
        (document.documentElement.getAttribute('data-sidebar-size') == "sm") ? document.documentElement.setAttribute('data-sidebar-size', 'lg') : document.documentElement.setAttribute('data-sidebar-size', 'sm')
      }
    }

    if (document.documentElement.clientWidth <= 767) {
      document.body.classList.toggle('vertical-sidebar-enable');
    }
    this.isCondensed = !this.isCondensed;
  }

  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");
    }
  }

  onResize(event: any) {
    if (document.body.getAttribute('layout') == "twocolumn") {
      if (event.target.innerWidth <= 767) {
        this.eventService.broadcast('changeLayout', 'vertical');
      } else {
        this.eventService.broadcast('changeLayout', 'twocolumn');
        document.body.classList.remove('twocolumn-panel');
        document.body.classList.remove('vertical-sidebar-enable');
      }
    }
  }
}
