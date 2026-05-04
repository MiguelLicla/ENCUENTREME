using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;
using Encuentreme.Entities.Entities;
using System.Collections.Generic;

namespace Encuentreme.Data.Repositories;

public class EntregaData
{
    public List<Entrega> Listar(int idEntrega = 0, int idEstado = 0, string codTrabajador = "")
        => DbQuery.Exec("public.man_entrega_lis")
            .Add("p_identrega", idEntrega)
            .Add("p_idestado", idEstado)
            .Add("p_codtrabajador", codTrabajador)
            .ToList<Entrega>();

    public ReturnValue Insertar(Entrega req)
        => DbQuery.Exec("public.man_entrega_ins")
            .Add("p_dsc_apellido_materno", req.dsc_apellido_materno ?? "")
            .Add("p_dsc_apellido_paterno", req.dsc_apellido_paterno ?? "")
            .Add("p_dsc_correo", req.dsc_correo ?? "")
            .Add("p_dsc_imagen_entrega", (object?)null)
            .Add("p_dsc_nombre", req.dsc_nombre ?? "")
            .Add("p_dsc_observacion_entrega", req.dsc_observacion_entrega ?? "")
            .Add("p_fch_entrega_programado", (object?)req.fch_entrega_programado)
            .Add("p_num_documento", req.num_documento ?? "")
            .Add("p_num_telefono", req.num_telefono ?? "")
            .Add("p_id_estado", req.id_estado)
            .Add("p_id_objeto", req.id_objeto)
            .Add("p_id_publicacion", req.id_publicacion)
            .Add("p_cod_trabajador", req.cod_trabajador ?? "")
            .Add("p_cod_usuario", req.cod_usuario ?? "")
            .ToResult();

    public ReturnValue Confirmar(int idEntrega, string codUsuario)
        => DbQuery.Exec("public.man_entrega_confirmar")
            .Add("p_identrega", idEntrega)
            .Add("p_cod_usuario", codUsuario)
            .ToResult();
}
