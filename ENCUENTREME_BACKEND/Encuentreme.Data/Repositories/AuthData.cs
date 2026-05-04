using Encuentreme.Framework.Db;
using Encuentreme.Framework.Response;

namespace Encuentreme.Data.Repositories;

public class AuthData
{
    public ReturnValue Validar(string codUsuario, string clave)
    {
        return DbQuery.Exec("public.con_auth_valida")
            .Add("p_codusuario", codUsuario)
            .Add("p_clave", clave)
            .ToResult();
    }

    public string ObtenerUsuario(string codUsuario)
    {
        return DbQuery.Exec("public.con_auth_usuario")
            .Add("p_codusuario", codUsuario)
            .ToJson();
    }
}
