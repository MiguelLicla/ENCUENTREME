using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;
using Encuentreme.Entities.Entities;
using System.Collections.Generic;

namespace Encuentreme.Data.Repositories;

public class ObjetoData
{
    public List<ObjetoExtraviado> Listar(int idObjeto = 0, int idEstado = 0, int idTipo = 0, string codUsuario = "")
        => DbQuery.Exec("public.man_objeto_lis")
            .Add("p_idobjeto", idObjeto)
            .Add("p_idestado", idEstado)
            .Add("p_idtipo", idTipo)
            .Add("p_codusuario", codUsuario)
            .ToList<ObjetoExtraviado>();

    public ReturnValue Insertar(ObjetoExtraviado req)
        => DbQuery.Exec("public.man_objeto_ins")
            .Add("p_dsc_apellido_materno", req.dsc_apellido_materno ?? "")
            .Add("p_dsc_apellido_paterno", req.dsc_apellido_paterno ?? "")
            .Add("p_dsc_color", req.dsc_color ?? "")
            .Add("p_dsc_detalle_objeto", req.dsc_detalle_objeto ?? "")
            .Add("p_dsc_imagen", req.dsc_imagen ?? "")
            .Add("p_dsc_lugar_extraviado", req.dsc_lugar_extraviado ?? "")
            .Add("p_dsc_marca", req.dsc_marca ?? "")
            .Add("p_dsc_nombre", req.dsc_nombre ?? "")
            .Add("p_dsc_objeto", req.dsc_objeto)
            .Add("p_fch_extraviado", (object?)req.fch_extraviado)
            .Add("p_fch_maxima_espera", (object?)req.fch_maxima_espera)
            .Add("p_flg_apto_donacion", req.flg_apto_donacion ?? "")
            .Add("p_flg_desechable", req.flg_desechable ?? "")
            .Add("p_id_estado", req.id_estado)
            .Add("p_id_tipo", req.id_tipo)
            .Add("p_cod_usuario", req.cod_usuario)
            .ToResult();

    public ReturnValue Actualizar(ObjetoExtraviado req)
        => DbQuery.Exec("public.man_objeto_upd")
            .Add("p_id_objeto", req.id_objeto)
            .Add("p_dsc_apellido_materno", req.dsc_apellido_materno ?? "")
            .Add("p_dsc_apellido_paterno", req.dsc_apellido_paterno ?? "")
            .Add("p_dsc_color", req.dsc_color ?? "")
            .Add("p_dsc_detalle_objeto", req.dsc_detalle_objeto ?? "")
            .Add("p_dsc_imagen", req.dsc_imagen ?? "")
            .Add("p_dsc_lugar_extraviado", req.dsc_lugar_extraviado ?? "")
            .Add("p_dsc_marca", req.dsc_marca ?? "")
            .Add("p_dsc_nombre", req.dsc_nombre ?? "")
            .Add("p_dsc_objeto", req.dsc_objeto)
            .Add("p_fch_extraviado", (object?)req.fch_extraviado)
            .Add("p_fch_maxima_espera", (object?)req.fch_maxima_espera)
            .Add("p_flg_apto_donacion", req.flg_apto_donacion ?? "")
            .Add("p_flg_desechable", req.flg_desechable ?? "")
            .Add("p_id_estado", req.id_estado)
            .Add("p_id_tipo", req.id_tipo)
            .ToResult();

    public ReturnValue ActualizarEstado(int idObjeto, int idEstado)
        => DbQuery.Exec("public.man_objeto_upd_estado")
            .Add("p_id_objeto", idObjeto)
            .Add("p_id_estado", idEstado)
            .ToResult();

    public ReturnValue Eliminar(int idObjeto)
        => DbQuery.Exec("public.man_objeto_del")
            .Add("p_id_objeto", idObjeto)
            .ToResult();
}
