using System;

namespace Encuentreme.Entities.Entities;

public class Publicacion
{
    public int id_publicacion { get; set; }
    public string dsc_titulo { get; set; } = string.Empty;
    public string dsc_detalle_objeto { get; set; } = string.Empty;
    public string dsc_nombre { get; set; } = string.Empty;
    public string dsc_apellido_paterno { get; set; } = string.Empty;
    public string dsc_apellido_materno { get; set; } = string.Empty;
    public string dsc_color { get; set; } = string.Empty;
    public string dsc_marca { get; set; } = string.Empty;
    public string dsc_lugar_perdida { get; set; } = string.Empty;
    public string dsc_correo { get; set; } = string.Empty;
    public string num_documento { get; set; } = string.Empty;
    public string num_telefono { get; set; } = string.Empty;
    public string dsc_imagen { get; set; } = string.Empty;
    public DateTime? fch_perdida { get; set; }
    public DateTime? fch_registro { get; set; }
    public int id_estado { get; set; }
    public string dsc_estado { get; set; } = string.Empty;
    public int id_tipo { get; set; }
    public string dsc_tipo { get; set; } = string.Empty;
}
