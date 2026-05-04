import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class ClienteService extends ApiService {

  listar(page = 1, pageSize = 20): Observable<PagedResponse<any>> {
    return this.getList(`cliente?page=${page}&pageSize=${pageSize}`);
  }

  obtener(id: number): Observable<ApiResponse<any>> {
    return this.get(`cliente/${id}`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('cliente', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`cliente/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`cliente/${id}`);
  }
}
