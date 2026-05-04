import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class PedidoService extends ApiService {

  listar(idEstado = 0): Observable<PagedResponse<any>> {
    return this.getList(`pedido?idEstadoPedido=${idEstado}`);
  }

  obtenerDetalle(idPedido: number): Observable<ApiResponse<any>> {
    return this.get(`pedido/${idPedido}/detalle`);
  }

  registrar(data: any): Observable<ApiResponse<any>> {
    return this.post('pedido', data);
  }

  actualizarEstado(idPedido: number, idEstado: number, audUsuario: number): Observable<ApiResponse<any>> {
    return this.put(`pedido/${idPedido}/estado`, { idEstadoPedido: idEstado, audUsuario });
  }

  eliminar(id: number): Observable<ApiResponse<any>> {
    return this.delete(`pedido/${id}`);
  }

  registrarDetalle(data: any): Observable<ApiResponse<any>> {
    return this.post('pedido/detalle', data);
  }

  siguienteCodigo(): Observable<ApiResponse<string>> {
    return this.get('pedido/codigo');
  }
}
