import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import { ApiResponse, PagedResponse } from '../models/carwash.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly base = GlobalComponent.API_URL;

  constructor(protected http: HttpClient) {}

  protected get<T>(path: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.base}${path}`);
  }

  protected getList<T>(path: string): Observable<PagedResponse<T>> {
    return this.http.get<PagedResponse<T>>(`${this.base}${path}`);
  }

  protected post<T>(path: string, body: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.base}${path}`, body);
  }

  protected put<T>(path: string, body: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.base}${path}`, body);
  }

  protected patch<T>(path: string, body: any): Observable<ApiResponse<T>> {
    return this.http.patch<ApiResponse<T>>(`${this.base}${path}`, body);
  }

  protected delete<T>(path: string): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.base}${path}`);
  }
}
