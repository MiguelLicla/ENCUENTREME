import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class UsuarioService extends ApiService {

  listar(): Observable<PagedResponse<any>> {
    return this.getList('usuario');
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('usuario', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`usuario/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`usuario/${id}`);
  }
}
