import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ApiService {

  obtenerDashboard(anio: string, periodo: number): Observable<any> {
    return this.get(`api/Dashboard/listar?anio=${anio}&idperiodo=${periodo}`);
  }

  getReporte(): Observable<any> {
    return this.get('api/Dashboard/reporte');
  }
}
