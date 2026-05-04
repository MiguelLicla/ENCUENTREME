using Encuentreme.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MaestraController : ControllerBase
{
    private readonly MaestraData _data = new();
    private readonly InstitucionData _instituciones = new();

    [HttpGet("tipos-objeto")]
    public ActionResult GetTipos() => Content(_data.ListarTiposObjeto(), "application/json");

    [HttpGet("estados-publicacion")]
    public ActionResult GetEstadosPub() => Content(_data.ListarEstadosPublicacion(), "application/json");

    [HttpGet("estados-objeto")]
    public ActionResult GetEstadosObj() => Content(_data.ListarEstadosObjeto(), "application/json");

    [HttpGet("estados-entrega")]
    public ActionResult GetEstadosEnt() => Content(_data.ListarEstadosEntrega(), "application/json");

    [HttpGet("estados-donacion")]
    public ActionResult GetEstadosDon() => Content(_data.ListarEstadosDonacion(), "application/json");

    [HttpGet("sedes")]
    public ActionResult GetSedes(string cod = "") => Content(_data.ListarSedes(cod), "application/json");

    [HttpGet("instituciones")]
    public ActionResult GetInstituciones(int id = 0)
    {
        var lista = _instituciones.Listar(id);
        return Ok(new { success = true, data = lista });
    }
}
