using System;

namespace Encuentreme.Entities.Entities;

public class ObjetoExtraviado
{
    public int id_objeto { get; set; }
    public string dsc_objeto { get; set; } = string.Empty;
    public string dsc_detalle_objeto { get; set; } = string.Empty;
    public string dsc_marca { get; set; } = string.Empty;
    public string dsc_color { get; set; } = string.Empty;
    public string dsc_lugar_extraviado { get; set; } = string.Empty;
    public DateTime? fch_extraviado { get; set; }
    public DateTime? fch_maxima_espera { get; set; }
    public DateTime? fch_registro { get; set; }
    public string flg_apto_donacion { get; set; } = string.Empty;
    public string flg_desechable { get; set; } = string.Empty;
    public int id_estado { get; set; }
    public string dsc_estado { get; set; } = string.Empty;
    public int id_tipo { get; set; }
    public string dsc_tipo { get; set; } = string.Empty;
    public string dsc_nombre { get; set; } = string.Empty;
    public string dsc_apellido_paterno { get; set; } = string.Empty;
    public string dsc_apellido_materno { get; set; } = string.Empty;
    public string dsc_imagen { get; set; } = string.Empty;
    public string cod_usuario { get; set; } = string.Empty;
    public string dsc_nombre_propietario { get; set; } = string.Empty;
}
