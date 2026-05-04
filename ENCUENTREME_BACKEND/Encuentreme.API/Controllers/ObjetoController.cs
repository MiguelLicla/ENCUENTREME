using Encuentreme.Data.Repositories;
using Encuentreme.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ObjetoController : ControllerBase
{
    private readonly ObjetoData _data = new();

    [HttpGet("listar")]
    public ActionResult Listar(int idObjeto = 0, int idEstado = 0, int idTipo = 0, string codUsuario = "")
    {
        return Ok(new { success = true, data = _data.Listar(idObjeto, idEstado, idTipo, codUsuario) });
    }

    [HttpPost("insertar")]
    public ActionResult Insertar([FromBody] ObjetoExtraviado req)
    {
        var res = _data.Insertar(req);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message, code = res.Code });
    }

    [HttpPut("actualizar")]
    public ActionResult Actualizar([FromBody] ObjetoExtraviado req)
    {
        var res = _data.Actualizar(req);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }

    [HttpPut("actualizar-estado")]
    public ActionResult ActualizarEstado(int idObjeto, int idEstado)
    {
        var res = _data.ActualizarEstado(idObjeto, idEstado);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }

    [HttpDelete("eliminar")]
    public ActionResult Eliminar(int idObjeto)
    {
        var res = _data.Eliminar(idObjeto);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }
}
