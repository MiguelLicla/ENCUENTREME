import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class OpcionService extends ApiService {

  listar(idPadre = 0): Observable<PagedResponse<any>> {
    return this.getList(`opcion?idPadre=${idPadre}`);
  }

  listarTodas(): Observable<PagedResponse<any>> {
    return this.getList('opcion');
  }

  obtener(id: number): Observable<ApiResponse<any>> {
    return this.get(`opcion/${id}`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('opcion', data);
  }

  actualizar(id: number, data: any): Observable<ApiResponse<any>> {
    return this.put(`opcion/${id}`, data);
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`opcion/${id}`);
  }
}
