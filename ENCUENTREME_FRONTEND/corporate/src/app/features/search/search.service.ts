import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectQuery } from '@tanstack/angular-query-experimental';

export interface Hallazgo {
  id: number;
  titulo: string;
  categoria: string;
  fecha: string;
  lugar: string;
  estado: string;
  empresa: string;
  dsc_imagen?: string;
  dsc_detalle_objeto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient);

  private fetchHallazgos = async (filters: any): Promise<Hallazgo[]> => {
    // Mock Data con campos reales de tu DB PostgreSQL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, titulo: 'Mochila Targus Azul', categoria: 'Accesorios', fecha: '2026-04-20', lugar: 'Patio de Comidas', estado: 'En Custodia', empresa: 'Plaza Norte', dsc_detalle_objeto: 'Tiene un llavero de Batman' },
          { id: 2, titulo: 'iPhone 13 Pro Max', categoria: 'Tecnología', fecha: '2026-04-22', lugar: 'Cineplanet', estado: 'En Custodia', empresa: 'Plaza Norte', dsc_detalle_objeto: 'Pantalla con protector de vidrio' },
        ]);
      }, 800);
    });
  };

  getHallazgosQuery(filters: any) {
    return injectQuery(() => ({
      queryKey: ['hallazgos', filters],
      queryFn: () => this.fetchHallazgos(filters),
      staleTime: 1000 * 60 * 5,
    }));
  }
}
