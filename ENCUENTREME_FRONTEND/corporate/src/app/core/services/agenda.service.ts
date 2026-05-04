import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class AgendaService extends ApiService {

  listar(idEstado = 0): Observable<PagedResponse<any>> {
    return this.getList(`agenda?idEstadoCita=${idEstado}`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('agenda', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`agenda/${id}`, data);
  }

  actualizarEstado(idAgenda: number, idEstado: number, audUsuario: number): Observable<ApiResponse<any>> {
    return this.patch(`agenda/${idAgenda}/estado`, { idEstadoCita: idEstado, audUsuario });
  }
}
