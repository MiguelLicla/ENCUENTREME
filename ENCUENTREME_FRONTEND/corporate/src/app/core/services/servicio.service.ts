import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class ServicioService extends ApiService {

  listar(idTipo = 0): Observable<PagedResponse<any>> {
    return this.getList(`servicio?idTipoServicio=${idTipo}`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('servicio', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`servicio/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`servicio/${id}`);
  }
}
