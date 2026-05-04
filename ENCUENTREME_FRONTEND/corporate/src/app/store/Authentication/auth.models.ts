import { AuthOpcion, AuthUsuario } from '../../core/models/carwash.models';

export class User {
  token?:   string;
  usuario?: AuthUsuario;
  opciones?: AuthOpcion[];
}
