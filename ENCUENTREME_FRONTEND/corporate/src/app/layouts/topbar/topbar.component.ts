import { Component, OnInit, EventEmitter, Output, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() mobileMenuButtonClicked = new EventEmitter();
  
  usuario: any;
  isDarkMode: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.usuario = this.authService.getUser();
  }

  ngOnInit(): void { }

  toggleMobileMenu(event?: any) {
    this.mobileMenuButtonClicked.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/signin/basic']);
  }

  windowScroll() {}
  fullscreen() {}
  toggleDarkMode() { this.isDarkMode = !this.isDarkMode; }
}
