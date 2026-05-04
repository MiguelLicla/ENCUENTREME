import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay animate-fade-in">
      <div class="loader-card shadow-2xl">
        <div class="icon-wrapper">
          <lord-icon
            src="https://cdn.lordicon.com/msoeawqm.json"
            trigger="loop"
            colors="primary:#00A1B1,secondary:#00d2df"
            style="width:120px;height:120px">
          </lord-icon>
        </div>
        <div class="text-content mt-4">
          <h4 class="text-dark fw-black tracking-tighter uppercase mb-1">Sincronizando</h4>
          <p class="text-muted small fw-bold uppercase tracking-widest animate-pulse">Conectando con Bóveda de Seguridad...</p>
        </div>
        <div class="progress-bar-container">
           <div class="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(244, 247, 246, 0.6);
      backdrop-filter: blur(12px) saturate(180%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100000;
    }
    .loader-card {
      background: rgba(255, 255, 255, 0.9);
      padding: 3rem;
      border-radius: 2rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.4);
      position: relative;
      overflow: hidden;
    }
    .progress-bar-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #f1f3f4;
    }
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00A1B1, #00d2df);
      width: 30%;
      animation: progressMove 1.5s infinite ease-in-out;
    }
    @keyframes progressMove {
      0% { width: 0%; left: 0%; }
      50% { width: 50%; }
      100% { width: 0%; left: 100%; }
    }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
