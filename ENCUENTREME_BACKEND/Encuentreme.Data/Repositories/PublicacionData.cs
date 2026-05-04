using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;
using Encuentreme.Entities.Entities;

namespace Encuentreme.Data.Repositories;

public class PublicacionData
{
    public List<Publicacion> Listar(int idPublicacion = 0, int idEstado = 0, int idTipo = 0)
        => DbQuery.Exec("public.man_publicacion_lis")
            .Add("p_idpublicacion", idPublicacion)
            .Add("p_idestado", idEstado)
            .Add("p_idtipo", idTipo)
            .ToList<Publicacion>();

    public ReturnValue Insertar(Publicacion req)
        => DbQuery.Exec("public.man_publicacion_ins")
            .Add("p_dsc_apellido_materno", req.dsc_apellido_materno ?? "")
            .Add("p_dsc_apellido_paterno", req.dsc_apellido_paterno ?? "")
            .Add("p_dsc_color", req.dsc_color ?? "")
            .Add("p_dsc_correo", req.dsc_correo ?? "")
            .Add("p_dsc_detalle_objeto", req.dsc_detalle_objeto ?? "")
            .Add("p_dsc_imagen", req.dsc_imagen ?? "")
            .Add("p_dsc_lugar_perdida", req.dsc_lugar_perdida ?? "")
            .Add("p_dsc_marca", req.dsc_marca ?? "")
            .Add("p_dsc_nombre", req.dsc_nombre ?? "")
            .Add("p_dsc_titulo", req.dsc_titulo ?? "")
            .Add("p_fch_perdida", req.fch_perdida)
            .Add("p_num_documento", req.num_documento ?? "")
            .Add("p_num_telefono", req.num_telefono ?? "")
            .Add("p_id_tipo", req.id_tipo)
            .ToResult();

    public ReturnValue ActualizarImagen(int idPublicacion, string dscImagen)
        => DbQuery.Exec("public.man_publicacion_upd_imagen")
            .Add("p_id_publicacion", idPublicacion)
            .Add("p_dsc_imagen", dscImagen)
            .ToResult();

    public ReturnValue ActualizarEstado(int idPublicacion, int idEstado)
        => DbQuery.Exec("public.man_publicacion_upd_estado")
            .Add("p_idpublicacion", idPublicacion)
            .Add("p_idestado", idEstado)
            .ToResult();
}
