import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class PromocionService extends ApiService {

  listar(): Observable<PagedResponse<any>> {
    return this.getList('promocion');
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('promocion', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`promocion/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`promocion/${id}`);
  }
}
