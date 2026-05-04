using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;
using Encuentreme.Entities.Entities;
using System;
using System.Collections.Generic;

namespace Encuentreme.Data.Repositories;

public class DonacionData
{
    public List<Donacion> Listar(int idDonacion = 0, int idEstado = 0, string codTrabajador = "")
        => DbQuery.Exec("public.man_donacion_lis")
            .Add("p_iddonacion", idDonacion)
            .Add("p_idestado", idEstado)
            .Add("p_codtrabajador", codTrabajador)
            .ToList<Donacion>();

    public ReturnValue Insertar(Donacion req)
        => DbQuery.Exec("public.man_donacion_ins")
            .Add("p_dsc_donacion", req.dsc_donacion ?? "")
            .Add("p_fch_programado", (object?)req.fch_programado)
            .Add("p_id_institucion", req.id_institucion)
            .Add("p_cod_trabajador", req.cod_trabajador)
            .Add("p_cod_usuario", req.cod_usuario)
            .ToResult();

    public ReturnValue InsertarObjeto(int idDonacion, int idObjeto)
        => DbQuery.Exec("public.man_donacion_objeto_ins")
            .Add("p_iddonacion", idDonacion)
            .Add("p_idobjeto", idObjeto)
            .ToResult();

    public ReturnValue ActualizarEstado(int idDonacion, int idEstado, DateTime? fchDonacion)
        => DbQuery.Exec("public.man_donacion_upd_estado")
            .Add("p_iddonacion", idDonacion)
            .Add("p_idestado", idEstado)
            .Add("p_fch_donacion", (object?)fchDonacion)
            .ToResult();
}
