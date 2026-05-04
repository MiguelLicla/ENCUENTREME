import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PublicacionService } from 'src/app/core/services/publicacion.service';
import { EntregaService } from 'src/app/core/services/entrega.service';
import { ObjetoService } from 'src/app/core/services/objeto.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion-listado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './publicacion-listado.component.html'
})
export class PublicacionListadoComponent implements OnInit, OnDestroy {
  publicaciones: any[] = [];
  publicacionesFiltradas: any[] = [];
  loading = false;
  filtroTexto = '';
  filtroEstado = '';

  modalVisible = false;
  itemSeleccionado: any = null;
  objetos: any[] = [];
  objetoSeleccionado: any = null;
  cargandoObjetos = false;
  guardandoEntrega = false;

  entrega: any = {};

  constructor(
    private publicacionService: PublicacionService,
    private entregaService: EntregaService,
    private objetoService: ObjetoService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  cargar() {
    this.loading = true;
    this.publicacionService.listar().subscribe({
      next: (res) => {
        this.publicaciones = res.data ?? [];
        this.aplicarFiltro();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  aplicarFiltro() {
    const txt = this.filtroTexto.toLowerCase();
    this.publicacionesFiltradas = this.publicaciones.filter(p =>
      (!txt ||
        p.dsc_titulo?.toLowerCase().includes(txt) ||
        p.dsc_nombre?.toLowerCase().includes(txt) ||
        p.dsc_apellido_paterno?.toLowerCase().includes(txt)) &&
      (!this.filtroEstado || p.dsc_estado === this.filtroEstado)
    );
  }

  get estados(): string[] {
    return [...new Set<string>(this.publicaciones.map((p: any) => p.dsc_estado).filter(Boolean))];
  }

  badgeClass(idEstado: number): string {
    if (idEstado === 3) return 'bg-success';
    if (idEstado === 2) return 'bg-info text-dark';
    return 'bg-warning text-dark';
  }

  gestionar(item: any) {
    this.itemSeleccionado = item;
    this.objetoSeleccionado = null;
    const user = this.authService.getUser();
    this.entrega = {
      id_publicacion: item.id_publicacion,
      id_objeto: null,
      dsc_nombre_receptor: item.dsc_nombre ?? '',
      dsc_apellido_receptor: item.dsc_apellido_paterno ?? '',
      num_documento: item.num_documento ?? '',
      num_telefono_receptor: item.num_telefono ?? '',
      cod_trabajador: user?.cod_usuario ?? '001',
      cod_usuario: user?.cod_usuario ?? '001'
    };
    this.cargarObjetos();
    this.modalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  cargarObjetos() {
    this.cargandoObjetos = true;
    this.objetoService.listar(0, 1).subscribe({
      next: (res) => {
        this.objetos = res.data ?? [];
        this.cargandoObjetos = false;
      },
      error: () => { this.cargandoObjetos = false; }
    });
  }

  seleccionarObjeto(obj: any) {
    this.objetoSeleccionado = obj;
    this.entrega.id_objeto = obj.id_objeto;
  }

  crearEntrega() {
    if (!this.entrega.id_objeto) {
      Swal.fire('Atención', 'Debe seleccionar un objeto encontrado en custodia.', 'warning');
      return;
    }
    if (!this.entrega.num_documento) {
      Swal.fire('Atención', 'Ingrese el número de documento del receptor.', 'warning');
      return;
    }
    this.guardandoEntrega = true;
    this.entregaService.insertar(this.entrega).subscribe({
      next: (res) => {
        this.guardandoEntrega = false;
        if (res?.success !== false) {
          Swal.fire({
            title: '¡Entrega Registrada!',
            text: 'La entrega fue creada exitosamente.',
            icon: 'success',
            confirmButtonColor: '#00A1B1'
          });
          this.cerrarModal();
          this.cargar();
        } else {
          Swal.fire('Error', res?.message ?? 'No se pudo registrar la entrega.', 'error');
        }
      },
      error: () => {
        this.guardandoEntrega = false;
        Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      }
    });
  }

  cerrarModal() {
    this.modalVisible = false;
    this.itemSeleccionado = null;
    this.objetoSeleccionado = null;
    document.body.style.overflow = '';
  }
}
