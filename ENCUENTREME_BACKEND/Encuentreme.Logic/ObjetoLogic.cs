using Encuentreme.Data.Repositories;
using Encuentreme.Entities.Entities;
using Encuentreme.Framework.Response;
using System.Collections.Generic;

namespace Encuentreme.Logic;

public class ObjetoLogic
{
    private readonly ObjetoData _data = new();

    public List<ObjetoExtraviado> Listar(int idObjeto, int idEstado, int idTipo, string codUsuario)
        => _data.Listar(idObjeto, idEstado, idTipo, codUsuario);

    public ReturnValue Insertar(ObjetoExtraviado req)
        => _data.Insertar(req);

    public ReturnValue Actualizar(ObjetoExtraviado req)
        => _data.Actualizar(req);
}
