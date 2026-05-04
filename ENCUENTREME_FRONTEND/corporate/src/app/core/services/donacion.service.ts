import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionService extends ApiService {

  listar(): Observable<any> {
    return this.get(`api/Donacion/listar`);
  }

  insertar(idObjeto: number, dscInstitucion: string): Observable<any> {
    return this.post('api/Donacion/insertar', { id_objeto: idObjeto, dsc_institucion: dscInstitucion });
  }
}
