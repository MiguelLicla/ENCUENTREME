using Encuentreme.Framework.Db;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DebugController : ControllerBase
{
    [HttpGet("db-check")]
    public async Task<ActionResult> Check()
    {
        try
        {
            using var cnn = new NpgsqlConnection(DbConfig.ConnectionString);
            await cnn.OpenAsync();
            
            using var cmd = new NpgsqlCommand("SELECT proname FROM pg_proc WHERE proname LIKE 'con_%' OR proname LIKE 'man_%'", cnn);
            using var reader = await cmd.ExecuteReaderAsync();
            
            var functions = new List<string>();
            while (await reader.ReadAsync())
            {
                functions.Add(reader.GetString(0));
            }
            
            return Ok(new { 
                success = true, 
                message = "Conexión exitosa", 
                found_functions = functions 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, error = ex.Message });
        }
    }

    [HttpGet("tables-check")]
    public async Task<ActionResult> Tables()
    {
        try
        {
            using var cnn = new NpgsqlConnection(DbConfig.ConnectionString);
            await cnn.OpenAsync();
            
            using var cmd = new NpgsqlCommand("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'", cnn);
            using var reader = await cmd.ExecuteReaderAsync();
            
            var tables = new List<string>();
            while (await reader.ReadAsync())
            {
                tables.Add(reader.GetString(0));
            }
            
            return Ok(new { 
                success = true, 
                found_tables = tables 
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, error = ex.Message });
        }
    }
}
