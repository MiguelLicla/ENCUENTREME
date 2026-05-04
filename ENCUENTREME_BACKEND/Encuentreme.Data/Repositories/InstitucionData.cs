using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;
using Encuentreme.Entities.Entities;
using System.Collections.Generic;

namespace Encuentreme.Data.Repositories;

public class InstitucionData
{
    public List<Institucion> Listar(int idInstitucion = 0)
        => DbQuery.Exec("public.con_institucion_lis")
            .Add("p_idinstitucion", idInstitucion)
            .ToList<Institucion>();

    public ReturnValue Insertar(Institucion req)
        => DbQuery.Exec("public.man_institucion_ins")
            .Add("p_dsc_correo", req.dsc_correo ?? "")
            .Add("p_dsc_direccion", req.dsc_direccion ?? "")
            .Add("p_dsc_institucion", req.dsc_institucion)
            .Add("p_dsc_telefono", req.dsc_telefono ?? "")
            .ToResult();

    public ReturnValue Actualizar(Institucion req)
        => DbQuery.Exec("public.man_institucion_upd")
            .Add("p_idinstitucion", req.id_institucion)
            .Add("p_dsc_correo", req.dsc_correo ?? "")
            .Add("p_dsc_direccion", req.dsc_direccion ?? "")
            .Add("p_dsc_institucion", req.dsc_institucion)
            .Add("p_dsc_telefono", req.dsc_telefono ?? "")
            .ToResult();

    public ReturnValue Eliminar(int idInstitucion)
        => DbQuery.Exec("public.man_institucion_del")
            .Add("p_idinstitucion", idInstitucion)
            .ToResult();
}
