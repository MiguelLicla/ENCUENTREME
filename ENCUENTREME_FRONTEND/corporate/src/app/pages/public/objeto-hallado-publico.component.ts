import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ObjetoService } from 'src/app/core/services/objeto.service';
import { AdZoneComponent } from 'src/app/shared/components/ad-zone/ad-zone.component';

@Component({
  selector: 'app-objeto-hallado-publico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdZoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './objeto-hallado-publico.component.html'
})
export class ObjetoHalladoPublicoComponent implements OnInit {
  objetos: any[] = [];
  filtro: string = '';

  constructor(private objetoService: ObjetoService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.objetoService.listar(0, 1).subscribe(res => { this.objetos = res.data; });
  }

  get objetosFiltrados() {
    return this.objetos.filter(o => 
      o.dsc_objeto.toLowerCase().includes(this.filtro.toLowerCase()) ||
      o.dsc_lugar_extraviado.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
