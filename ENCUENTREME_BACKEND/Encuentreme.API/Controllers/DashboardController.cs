using Encuentreme.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly DashboardData _data = new();

    [HttpGet("reporte")]
    public ActionResult GetReporte()
    {
        var json = _data.ListarReporte();
        var parsed = JsonSerializer.Deserialize<object>(json);
        return Ok(new { success = true, data = parsed });
    }
}
