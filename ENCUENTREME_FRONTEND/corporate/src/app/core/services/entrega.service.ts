import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregaService extends ApiService {

  listar(idEntrega: number = 0, idEstado: number = 0): Observable<any> {
    return this.get(`api/Entrega/listar?idEntrega=${idEntrega}&idEstado=${idEstado}`);
  }

  insertar(data: any): Observable<any> {
    return this.post('api/Entrega/insertar', data);
  }
}
