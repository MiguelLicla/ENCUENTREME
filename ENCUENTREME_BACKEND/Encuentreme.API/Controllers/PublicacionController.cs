using Encuentreme.Data.Repositories;
using Encuentreme.Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PublicacionController : ControllerBase
{
    private readonly PublicacionData _data = new();

    [HttpGet("listar")]
    public ActionResult Listar(int idPublicacion = 0, int idEstado = 0, int idTipo = 0)
    {
        var lista = _data.Listar(idPublicacion, idEstado, idTipo);
        return Ok(new { success = true, data = lista });
    }

    [HttpPost("insertar")]
    public ActionResult Insertar([FromBody] Publicacion req)
    {
        try
        {
            var res = _data.Insertar(req);
            if (!res.Success) return BadRequest(new { success = false, message = res.Message });
            return Ok(new { success = true, message = res.Message, id = res.Id });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPut("actualizar-imagen")]
    public ActionResult ActualizarImagen(int idPublicacion, string dscImagen)
    {
        try
        {
            var res = _data.ActualizarImagen(idPublicacion, dscImagen);
            if (!res.Success) return BadRequest(new { success = false, message = res.Message });
            return Ok(new { success = true, message = res.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }

    [HttpPut("actualizar-estado")]
    public ActionResult ActualizarEstado(int idPublicacion, int idEstado)
    {
        try
        {
            var res = _data.ActualizarEstado(idPublicacion, idEstado);
            if (!res.Success) return BadRequest(new { success = false, message = res.Message });
            return Ok(new { success = true, message = res.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
}
