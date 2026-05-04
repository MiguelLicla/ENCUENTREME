using Encuentreme.Framework.Db;

namespace Encuentreme.Data.Repositories;

public class MaestraData
{
    public string ListarEstadosObjeto(int id = 0) => DbQuery.Exec("public.con_estadoobjeto_lis").Add("p_idestado", id).ToJson();
    public string ListarEstadosPublicacion(int id = 0) => DbQuery.Exec("public.con_estadopublicacion_lis").Add("p_idestado", id).ToJson();
    public string ListarEstadosEntrega(int id = 0) => DbQuery.Exec("public.con_estadoentrega_lis").Add("p_idestado", id).ToJson();
    public string ListarEstadosDonacion(int id = 0) => DbQuery.Exec("public.con_estadodonacion_lis").Add("p_idestado", id).ToJson();
    public string ListarTiposObjeto(int id = 0) => DbQuery.Exec("public.con_tipoobjeto_lis").Add("p_idtipo", id).ToJson();
    public string ListarSedes(string cod = "") => DbQuery.Exec("public.con_sede_lis").Add("p_codlocalidad", cod).ToJson();
}
