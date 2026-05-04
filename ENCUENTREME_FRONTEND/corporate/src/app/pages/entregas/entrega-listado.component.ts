import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EntregaService } from 'src/app/core/services/entrega.service';
import { AdZoneComponent } from 'src/app/shared/components/ad-zone/ad-zone.component';

@Component({
  selector: 'app-entrega-listado',
  standalone: true,
  imports: [CommonModule, RouterModule, AdZoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './entrega-listado.component.html'
})
export class EntregaListadoComponent implements OnInit {
  entregas: any[] = [];
  loading: boolean = false;

  constructor(private entregaService: EntregaService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.entregaService.listar().subscribe({
      next: (res) => {
        this.entregas = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
