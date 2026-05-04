import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService extends ApiService {

  listar(idPublicacion: number = 0, idEstado: number = 0, idTipo: number = 0): Observable<any> {
    return this.get(`api/Publicacion/listar?idPublicacion=${idPublicacion}&idEstado=${idEstado}&idTipo=${idTipo}`);
  }

  insertar(data: any): Observable<any> {
    return this.post('api/Publicacion/insertar', data);
  }

  actualizarImagen(idPublicacion: number, dscImagen: string): Observable<any> {
    return this.put(`api/Publicacion/actualizar-imagen?idPublicacion=${idPublicacion}&dscImagen=${encodeURIComponent(dscImagen)}`, {});
  }

  actualizarEstado(idPublicacion: number, idEstado: number): Observable<any> {
    return this.put(`api/Publicacion/actualizar-estado?idPublicacion=${idPublicacion}&idEstado=${idEstado}`, {});
  }
}
