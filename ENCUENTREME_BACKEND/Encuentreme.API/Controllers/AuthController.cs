using Encuentreme.Data.Repositories;
using Encuentreme.Entities.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace Encuentreme.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthData _data = new();
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("login")]
    public ActionResult Login([FromBody] LoginDto req)
    {
        var res = _data.Validar(req.Username, req.Password);
        if (!res.Success)
            return BadRequest(new { success = false, message = res.Message });

        var detalleJson = _data.ObtenerUsuario(req.Username);
        var detalle = JsonSerializer.Deserialize<object>(detalleJson);

        var token = GenerarToken(req.Username);

        return Ok(new
        {
            success = true,
            message = res.Message,
            data = new
            {
                token,
                usuario = detalle,
                opciones = Array.Empty<object>()
            }
        });
    }

    [HttpGet("perfil")]
    public ActionResult GetPerfil(string codUsuario)
    {
        var detalle = _data.ObtenerUsuario(codUsuario);
        return Content(detalle, "application/json");
    }

    private string GenerarToken(string codUsuario)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expMinutes = int.TryParse(_config["Jwt:ExpireMinutes"], out var m) ? m : 1440;

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, codUsuario),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
