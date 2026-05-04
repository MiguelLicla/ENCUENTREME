import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGConfig } from 'primeng/api';
import { PublicacionService } from 'src/app/core/services/publicacion.service';
import { MaestraService } from 'src/app/core/services/maestra.service';
import { CloudinaryService } from 'src/app/core/services/cloudinary.service';
import Swal from 'sweetalert2';
import { AdZoneComponent } from 'src/app/shared/components/ad-zone/ad-zone.component';

@Component({
  selector: 'app-publicacion-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdZoneComponent, CalendarModule],
  templateUrl: './publicacion-registro.component.html',
  styleUrls: ['./publicacion-registro.component.scss']
})
export class PublicacionRegistroComponent implements OnInit {
  private publicacionService = inject(PublicacionService);
  private maestraService     = inject(MaestraService);
  private cloudinary         = inject(CloudinaryService);
  private sanitizer          = inject(DomSanitizer);
  private primengConfig      = inject(PrimeNGConfig);

  publicacion: any = {
    id_tipo: null,
    dsc_titulo: '',
    dsc_detalle_objeto: '',
    dsc_nombre: '',
    dsc_apellido_paterno: '',
    dsc_correo: '',
    num_documento: '',
    num_telefono: '',
    dsc_lugar_perdida: '',
    dsc_color: '',
    dsc_marca: '',
    fch_perdida: new Date(),
    dsc_imagen: ''
  };

  tipos: any[] = [];
  imagePreview: SafeUrl | null = null;
  selectedFile: File | null = null;
  submitted = false;
  isSaving = signal(false);
  uploadStep: 'idle' | 'saving' | 'uploading' | 'updating' = 'idle';

  private readonly DEFAULT_IMAGE = 'assets/images/no-object.svg';

  steps = [{ label: 'Objeto' }, { label: 'Evidencia' }, { label: 'Identidad' }];
  today = new Date();

  // Expresiones Regulares
  private readonly REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly REGEX_PHONE = /^[0-9]{9}$/;
  private readonly REGEX_DNI   = /^[0-9]{8}$/;

  invalid(field: string): boolean {
    const val = this.publicacion[field]?.toString().trim() ?? '';
    if (this.submitted && !val) return true;

    // Validaciones específicas
    if (val) {
      if (field === 'dsc_correo' && !this.REGEX_EMAIL.test(val)) return true;
      if (field === 'num_telefono' && !this.REGEX_PHONE.test(val)) return true;
      if (field === 'num_documento' && !this.REGEX_DNI.test(val)) return true;
    }

    return false;
  }

  // Filtros estrictos para eventos (input)
  onlyNumbers(field: string) {
    this.publicacion[field] = this.publicacion[field].replace(/[^0-9]/g, '');
  }

  onlyLetters(field: string) {
    this.publicacion[field] = this.publicacion[field].replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
  }

  get uploadStatusLabel(): string {
    switch (this.uploadStep) {
      case 'saving':    return 'Guardando registro...';
      case 'uploading': return 'Subiendo foto...';
      case 'updating':  return 'Enlazando imagen...';
      default:          return 'Confirmar Registro';
    }
  }

  ngOnInit(): void { 
    this.configurarCalendarioEspanol();
    this.cargarMaestras(); 
  }

  private configurarCalendarioEspanol() {
    this.primengConfig.setTranslation({
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sm'
    });
  }

  cargarMaestras() {
    this.maestraService.listarTiposObjeto().subscribe(res => {
      this.tipos = res?.data ?? res ?? [];
      if (this.tipos.length > 0) this.publicacion.id_tipo = this.tipos[0].id_tipo;
    });
  }

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.publicacion.dsc_imagen = '';
  }

  clearImage() {
    this.imagePreview = null;
    this.selectedFile = null;
    this.publicacion.dsc_imagen = '';
  }

  guardar() {
    this.submitted = true;

    // Validación exhaustiva
    const fieldsToValidate = [
      'dsc_titulo', 'dsc_marca', 'dsc_color', 'num_documento',
      'num_telefono', 'dsc_correo', 'dsc_nombre', 'dsc_apellido_paterno'
    ];

    const hasErrors = fieldsToValidate.some(f => this.invalid(f));

    if (hasErrors) {
      Swal.fire({
        title: 'Formulario Incompleto',
        text: 'Por favor, revise los campos marcados en rojo. Asegúrese que el DNI tenga 8 dígitos, el celular 9 y el correo sea válido.',
        icon: 'warning',
        confirmButtonColor: '#00A1B1'
      });
      return;
    }

    this.isSaving.set(true);
    this.uploadStep = 'saving';

    // Paso 1: guardar registro en BD sin imagen
    const payload = {
      ...this.publicacion,
      dsc_imagen: '',
      fch_perdida: this.publicacion.fch_perdida instanceof Date
        ? this.publicacion.fch_perdida.toISOString().split('T')[0]
        : this.publicacion.fch_perdida
    };

    this.publicacionService.insertar(payload).subscribe({
      next: async (res: any) => {
        if (res?.success === false) {
          this.resetSaving();
          Swal.fire('Error', res.message ?? 'No se pudo registrar.', 'error');
          return;
        }

        const idPublicacion: number = res.id ?? 0;

        // Paso 2: subir imagen a Cloudinary (si el usuario adjuntó una)
        if (this.selectedFile) {
          this.uploadStep = 'uploading';
          try {
            const url = await this.cloudinary.upload(this.selectedFile);
            // Paso 3: actualizar el registro con la URL de Cloudinary
            this.uploadStep = 'updating';
            this.publicacionService.actualizarImagen(idPublicacion, url).subscribe({
              next: () => { this.finalizarExito(); },
              error: () => { this.finalizarExito(); } // registro ya guardado, imagen es opcional
            });
          } catch {
            // Si falla Cloudinary, el registro ya está guardado → éxito igual
            this.finalizarExito();
          }
        } else {
          // Sin imagen: asignar default y actualizar
          this.uploadStep = 'updating';
          this.publicacionService.actualizarImagen(idPublicacion, this.DEFAULT_IMAGE).subscribe({
            next: () => { this.finalizarExito(); },
            error: () => { this.finalizarExito(); }
          });
        }
      },
      error: (err: any) => {
        this.resetSaving();
        const msg = err?.error?.message ?? 'No se pudo conectar con el servidor.';
        Swal.fire('Error', msg, 'error');
      }
    });
  }

  private finalizarExito() {
    this.resetSaving();
    Swal.fire({
      title: '¡Reporte Registrado!',
      text: 'Su solicitud fue enviada al sistema de custodia de Plaza Norte.',
      icon: 'success',
      confirmButtonColor: '#00A1B1'
    });
    this.limpiar();
  }

  private resetSaving() {
    this.isSaving.set(false);
    this.uploadStep = 'idle';
  }

  limpiar() {
    this.publicacion = {
      id_tipo: this.tipos[0]?.id_tipo ?? null,
      dsc_titulo: '', dsc_detalle_objeto: '',
      dsc_nombre: '', dsc_apellido_paterno: '',
      dsc_correo: '', num_documento: '', num_telefono: '',
      dsc_lugar_perdida: '', dsc_color: '', dsc_marca: '',
      fch_perdida: new Date(),
      dsc_imagen: ''
    };
    this.imagePreview = null;
    this.selectedFile = null;
    this.submitted = false;
  }
}
