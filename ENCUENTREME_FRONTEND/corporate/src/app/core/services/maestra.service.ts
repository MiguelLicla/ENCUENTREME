import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class MaestraService extends ApiService {

  listarTiposObjeto(): Observable<any> {
    return this.get('api/Maestra/tipos-objeto');
  }

  listarEstadosPublicacion(): Observable<any> {
    return this.get('api/Maestra/estados-publicacion');
  }

  listarEstadosObjeto(): Observable<any> {
    return this.get('api/Maestra/estados-objeto');
  }
}
