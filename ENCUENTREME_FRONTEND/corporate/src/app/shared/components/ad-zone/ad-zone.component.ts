import { Component, Input, OnInit, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ad-zone',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-100 py-2">
      <!-- Label -->
      <div class="text-center mb-1">
        <span class="text-muted" style="font-size:10px;letter-spacing:.06em;">PUBLICIDAD</span>
      </div>

      <!-- Real AdSense tag (activo en producción) -->
      <ins class="adsbygoogle"
           style="display:block;"
           [attr.data-ad-client]="adsenseClientId"
           [attr.data-ad-slot]="slot"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>

      <!-- Mock visual (solo en desarrollo) -->
      <div *ngIf="isDevelopment"
           class="border rounded-2 overflow-hidden bg-white mx-auto"
           [ngClass]="mockSizeClass"
           style="max-width:100%;">
        <!-- Header barra Google -->
        <div class="d-flex align-items-center gap-1 px-2 border-bottom bg-light"
             style="height:22px;">
          <i class="ri-google-line text-muted" style="font-size:10px;"></i>
          <span class="text-muted text-uppercase fw-bold" style="font-size:9px;">Ads by Google</span>
          <i class="ri-information-line text-muted ms-auto" style="font-size:10px;"></i>
        </div>
        <!-- Contenido del mock -->
        <div class="d-flex align-items-center gap-3 p-3" style="height:calc(100% - 22px);">
          <div class="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0 d-none d-sm-flex"
               style="width:46px;height:46px;background:#e6f7f9;">
            <i class="ri-advertisement-fill" style="color:#00A1B1;font-size:20px;"></i>
          </div>
          <div class="flex-grow-1 min-width-0">
            <div class="fw-bold text-truncate" style="font-size:12px;color:#1d1d1f;">{{ adTitle }}</div>
            <div class="text-muted mt-1"
                 style="font-size:11px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
              {{ adDescription }}
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <small class="fw-bold" style="color:#00A1B1;font-size:10px;">{{ adLink }}</small>
              <span class="badge rounded-pill" style="background:#00A1B1;font-size:9px;">Visitar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .mock-728x90  { width: 100%; max-width: 728px; height: 104px; }
    .mock-300x250 { width: 300px; min-height: 210px; }
    .mock-in-feed { width: 100%; max-width: 580px; height: 108px; }
  `]
})
export class AdZoneComponent implements OnInit, AfterViewInit {
  @Input() slot: string = '0000000000';
  @Input() size: '728x90' | '300x250' | 'in-feed' = '728x90';

  adsenseClientId = environment.adsenseClientId;
  isDevelopment = !environment.production;
  mockSizeClass = 'mock-728x90';

  adTitle    = 'Seguro de Equipaje Premium';
  adDescription = 'Protege tus maletas y objetos valiosos contra robo o pérdida en todo el Perú.';
  adLink     = 'WWW.SEGUROS-PERU.PE';

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.mockSizeClass = `mock-${this.size}`;
    if (this.size === '300x250') {
      this.adTitle       = 'App Oficial Plaza Norte';
      this.adDescription = 'Descarga nuestra app y recibe alertas cuando encuentren tu objeto. ¡Es gratis!';
      this.adLink        = 'APPS.PLAZANORTE.PE';
    } else if (this.size === 'in-feed') {
      this.adTitle       = 'Servicios de Seguridad Plaza Norte';
      this.adDescription = 'Custodia profesional de objetos encontrados. Personal capacitado las 24 horas.';
      this.adLink        = 'WWW.PLAZANORTE.PE';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {}
    }
  }
}
