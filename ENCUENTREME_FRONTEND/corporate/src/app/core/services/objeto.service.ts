import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService extends ApiService {

  listar(idObjeto: number = 0, idEstado: number = 0, idTipo: number = 0): Observable<any> {
    return this.get(`api/Objeto/listar?idObjeto=${idObjeto}&idEstado=${idEstado}&idTipo=${idTipo}`);
  }

  insertar(data: any): Observable<any> {
    return this.post('api/Objeto/insertar', data);
  }

  actualizar(data: any): Observable<any> {
    return this.put('api/Objeto/actualizar', data);
  }
}
