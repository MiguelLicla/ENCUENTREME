using System;

namespace Encuentreme.Entities.Entities;

public class Donacion
{
    public int id_donacion { get; set; }
    public string dsc_donacion { get; set; } = string.Empty;
    public DateTime? fch_donacion { get; set; }
    public DateTime? fch_programado { get; set; }
    public DateTime? fch_registro { get; set; }
    public int id_estado { get; set; }
    public string dsc_estado { get; set; } = string.Empty;
    public int id_institucion { get; set; }
    public string dsc_institucion { get; set; } = string.Empty;
    public string cod_trabajador { get; set; } = string.Empty;
    public string dsc_trabajador { get; set; } = string.Empty;
    public long cantidad_objetos { get; set; }
    public string cod_usuario { get; set; } = string.Empty;
}
