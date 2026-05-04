import { Component, inject, signal, computed, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// Shared Components
import { AdZoneComponent } from '../../shared/components/ad-zone/ad-zone.component';

// PrimeNG Imports
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdZoneComponent,
    DataViewModule,
    ButtonModule,
    SidebarModule,
    TagModule,
    SkeletonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  private searchService = inject(SearchService);
  private sanitizer = inject(DomSanitizer);

  searchTerm = signal('');
  filters = signal<any>({});
  isFilterSidebarVisible = signal(false);

  categorias = [
    { label: 'Todas las categorías', value: null },
    { label: 'Tecnología', value: 'Tecnología' },
    { label: 'Documentos', value: 'Documentos' },
    { label: 'Accesorios', value: 'Accesorios' }
  ];
  
  estados = [
    { label: 'Cualquier estado', value: null },
    { label: 'En Custodia', value: 'En Custodia' },
    { label: 'Reclamado', value: 'Reclamado' }
  ];

  selectedCategoria: any = null;
  selectedEstado: any = null;
  selectedFecha: Date | null = null;

  query = this.searchService.getHallazgosQuery(this.filters);

  filteredResults = computed(() => {
    const data = this.query.data() || [];
    const term = this.searchTerm().toLowerCase();
    if (!term) return data;
    return data.filter(h => 
      h.titulo.toLowerCase().includes(term) || 
      h.lugar.toLowerCase().includes(term) ||
      h.dsc_detalle_objeto?.toLowerCase().includes(term)
    );
  });

  /**
   * Renderiza una imagen desde un campo bytea de PostgreSQL (llega como Base64 en el JSON)
   * @param imgData El string Base64 o el array de bytes
   */
  renderImage(imgData: any): SafeUrl | string {
    if (!imgData) {
      return 'assets/images/no-image.png'; // Asegúrate de que esta ruta exista o usa un placeholder web
    }

    // Si ya trae el prefijo data:image, lo devolvemos saneado
    if (typeof imgData === 'string' && imgData.startsWith('data:image')) {
      return this.sanitizer.bypassSecurityTrustUrl(imgData);
    }

    // PostgreSQL devuelve bytea como Base64. Construimos la URL de datos.
    // Usamos bypassSecurityTrustUrl para que Angular permita cargar el recurso.
    const base64Image = `data:image/png;base64,${imgData}`;
    return this.sanitizer.bypassSecurityTrustUrl(base64Image);
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  applyFilters() {
    this.filters.set({ categoria: this.selectedCategoria, estado: this.selectedEstado, fecha: this.selectedFecha });
    this.isFilterSidebarVisible.set(false);
  }

  resetFilters() {
    this.selectedCategoria = null;
    this.selectedEstado = null;
    this.selectedFecha = null;
    this.filters.set({});
  }

  getSeverity(estado: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    switch (estado) {
      case 'En Custodia': return 'success';
      case 'Reclamado': return 'info';
      default: return 'secondary';
    }
  }
}
