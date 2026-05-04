import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ObjetoService } from 'src/app/core/services/objeto.service';
import Swal from 'sweetalert2';
import { AdZoneComponent } from 'src/app/shared/components/ad-zone/ad-zone.component';

@Component({
  selector: 'app-objeto-listado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdZoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './objeto-listado.component.html'
})
export class ObjetoListadoComponent implements OnInit {
  objetos: any[] = [];
  nuevoObjeto: any = { id_tipo: 1, dsc_objeto: '', dsc_color: '', dsc_lugar_extraviado: '' };

  constructor(private objetoService: ObjetoService) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.objetoService.listar().subscribe(res => this.objetos = res.data);
  }

  registrar() {
    this.objetoService.insertar(this.nuevoObjeto).subscribe(() => {
      Swal.fire('Registrado', 'Objeto hallado ingresado al inventario', 'success');
      this.cargar();
    });
  }
}
