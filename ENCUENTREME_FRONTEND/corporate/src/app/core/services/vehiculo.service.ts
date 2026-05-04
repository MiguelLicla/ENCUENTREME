import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class VehiculoService extends ApiService {

  listar(idCliente = 0): Observable<PagedResponse<any>> {
    return this.getList(`vehiculo?idCliente=${idCliente}`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('vehiculo', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`vehiculo/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`vehiculo/${id}`);
  }
}
