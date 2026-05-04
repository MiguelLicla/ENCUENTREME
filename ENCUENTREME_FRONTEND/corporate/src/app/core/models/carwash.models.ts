export interface AuthUsuario {
  idUsuario: number;
  username:  string;
  nombre:    string;
  idRol:     number;
  rol:       string;
}

export interface AuthOpcion {
  idOpcion:    number;
  nombre:      string;
  idPadre:     number;
  descripcion: string;
  controller:  string;
  icono:       string;
  orden:       number;
}

export interface LoginResponse {
  success:  boolean;
  message:  string;
  data: {
    token:   string;
    usuario: AuthUsuario;
    opciones: AuthOpcion[];
  } | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T | null;
}

export interface PagedResponse<T> {
  success:    boolean;
  message:    string;
  data:       T[];
  page:       number;
  pageSize:   number;
  totalCount: number;
}
