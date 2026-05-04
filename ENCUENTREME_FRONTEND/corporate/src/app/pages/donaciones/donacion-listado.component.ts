import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DonacionService } from 'src/app/core/services/donacion.service';

@Component({
  selector: 'app-donacion-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './donacion-listado.component.html'
})
export class DonacionListadoComponent implements OnInit {
  donaciones: any[] = [];
  loading: boolean = false;

  constructor(private donacionService: DonacionService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.loading = true;
    this.donacionService.listar().subscribe({
      next: (res) => {
        this.donaciones = res.data ?? res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
