import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RootReducerState } from '../../store';
import { changeMode, changeLayoutWidth, changeLayoutPosition, changeTopbar, changeDataPreloader, changeSidebarColor, changeSidebarSize, changelayout, changeSidebarImage, changeSidebarVisibility } from '../../store/layouts/layout-action';

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})
export class RightsidebarComponent implements OnInit {
  @Output() settingsButtonClicked = new EventEmitter();

  constructor(private store: Store<RootReducerState>) { }

  ngOnInit(): void { }

  public show() {
    document.getElementById('theme-settings-offcanvas')?.classList.add('show');
    document.getElementById('theme-settings-offcanvas')?.setAttribute('style', 'visibility:visible');
  }

  hide() {
    document.getElementById('theme-settings-offcanvas')?.classList.remove('show');
    document.getElementById('theme-settings-offcanvas')?.setAttribute('style', 'visibility:hidden');
  }
}
