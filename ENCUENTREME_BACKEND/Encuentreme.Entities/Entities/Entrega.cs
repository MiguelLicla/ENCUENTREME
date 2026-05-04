using System;

namespace Encuentreme.Entities.Entities;

public class Entrega
{
    public int id_entrega { get; set; }
    public string dsc_nombre { get; set; } = string.Empty;
    public string dsc_apellido_paterno { get; set; } = string.Empty;
    public string dsc_apellido_materno { get; set; } = string.Empty;
    public string dsc_correo { get; set; } = string.Empty;
    public string num_documento { get; set; } = string.Empty;
    public string num_telefono { get; set; } = string.Empty;
    public string dsc_observacion_entrega { get; set; } = string.Empty;
    public DateTime? fch_entrega_programado { get; set; }
    public DateTime? fch_entrega_real { get; set; }
    public DateTime? fch_registro { get; set; }
    public int id_estado { get; set; }
    public string dsc_estado { get; set; } = string.Empty;
    public int id_objeto { get; set; }
    public string dsc_objeto { get; set; } = string.Empty;
    public int id_publicacion { get; set; }
    public string dsc_titulo_publicacion { get; set; } = string.Empty;
    public string cod_trabajador { get; set; } = string.Empty;
    public string dsc_trabajador { get; set; } = string.Empty;
    public string cod_usuario { get; set; } = string.Empty;
}
