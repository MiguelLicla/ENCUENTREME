import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class RolService extends ApiService {

  listar(): Observable<PagedResponse<any>> {
    return this.getList('rol');
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('rol', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`rol/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`rol/${id}`);
  }

  listarOpcionesRol(idRol: number): Observable<PagedResponse<any>> {
    return this.getList(`rolOpcion/${idRol}`);
  }

  guardarOpciones(idRol: number, opciones: number[], audUsuario: number): Observable<ApiResponse<any>> {
    return this.put('rolOpcion', { idRol, opciones, audUsuario });
  }
}
