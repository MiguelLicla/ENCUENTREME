using Encuentreme.Data.Repositories;
using Encuentreme.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EntregaController : ControllerBase
{
    private readonly EntregaData _data = new();

    [HttpGet("listar")]
    public ActionResult Listar(int idEntrega = 0, int idEstado = 0, string codTrabajador = "")
    {
        return Ok(new { success = true, data = _data.Listar(idEntrega, idEstado, codTrabajador) });
    }

    [HttpPost("insertar")]
    public ActionResult Insertar([FromBody] Entrega req)
    {
        var res = _data.Insertar(req);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message, code = res.Code });
    }

    [HttpPut("confirmar")]
    public ActionResult Confirmar(int idEntrega, string codUsuario)
    {
        var res = _data.Confirmar(idEntrega, codUsuario);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }
}
