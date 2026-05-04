import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublicacionService } from 'src/app/core/services/publicacion.service';
import { AdZoneComponent } from 'src/app/shared/components/ad-zone/ad-zone.component';

@Component({
  selector: 'app-publicacion-publica-listado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdZoneComponent],
  templateUrl: './publicacion-publica-listado.component.html'
})
export class PublicacionPublicaListadoComponent implements OnInit {
  publicaciones: any[] = [];
  publicacionesFiltradas: any[] = [];
  loading = false;
  filtroTexto = '';
  filtroTipo = '';

  constructor(private svc: PublicacionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.svc.listar().subscribe({
      next: (res) => {
        this.publicaciones = res.data ?? [];
        this.aplicarFiltro();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  aplicarFiltro() {
    const texto = this.filtroTexto.toLowerCase();
    this.publicacionesFiltradas = this.publicaciones.filter(p =>
      // Solo mostrar estados "Pendiente/Activo" (id_estado = 1)
      p.id_estado === 1 &&
      (!texto ||
        p.dsc_titulo?.toLowerCase().includes(texto) ||
        p.dsc_detalle_objeto?.toLowerCase().includes(texto) ||
        p.dsc_lugar_perdida?.toLowerCase().includes(texto)) &&
      (!this.filtroTipo || p.dsc_tipo === this.filtroTipo)
    );
  }

  get tipos(): string[] {
    return [...new Set(this.publicaciones.map(p => p.dsc_tipo).filter(Boolean))];
  }
}
