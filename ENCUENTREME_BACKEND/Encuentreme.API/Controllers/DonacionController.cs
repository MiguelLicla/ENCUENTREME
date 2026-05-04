using Encuentreme.Data.Repositories;
using Encuentreme.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonacionController : ControllerBase
{
    private readonly DonacionData _data = new();

    [HttpGet("listar")]
    public ActionResult Listar(int idDonacion = 0, int idEstado = 0, string codTrabajador = "")
    {
        var lista = _data.Listar(idDonacion, idEstado, codTrabajador);
        return Ok(new { success = true, data = lista });
    }

    [HttpPost("insertar")]
    public ActionResult Insertar([FromBody] Donacion req)
    {
        var res = _data.Insertar(req);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message, code = res.Code });
    }

    [HttpPost("insertar-objeto")]
    public ActionResult InsertarObjeto(int idDonacion, int idObjeto)
    {
        var res = _data.InsertarObjeto(idDonacion, idObjeto);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }

    [HttpPut("actualizar-estado")]
    public ActionResult ActualizarEstado(int idDonacion, int idEstado, DateTime? fchDonacion = null)
    {
        var res = _data.ActualizarEstado(idDonacion, idEstado, fchDonacion);
        if (!res.Success) return BadRequest(new { success = false, message = res.Message });
        return Ok(new { success = true, message = res.Message });
    }
}
