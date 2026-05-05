using Microsoft.Extensions.Configuration;
using Encuentreme.Entities.Entities;
using System.Text.Json;
using System.Text;
using System.Net.Http.Headers;

namespace Encuentreme.Framework.Mail;

public class EmailService
{
    private readonly IConfiguration _config;
    private readonly HttpClient _http;

    public EmailService(IConfiguration config)
    {
        _config = config;
        _http = new HttpClient();
    }

    // Método de "Súper Seguridad" corregido para tener exactamente los 89 caracteres de la clave
    private string GetEncryptedKey()
    {
        // xsmtpsib-37545bc60fe010c9c0ef963aedfc63c9455fdda1fe072cd0e43a3dc0c26ebd0b-nBr2pCiGTySpoeAr
        byte[] secret = { 
            119, 114, 108, 115, 111, 114, 104, 97, 44, 50, 54, 52, 51, 52, 97, 98, // 16
            53, 47, 101, 100, 47, 48, 47, 98, 56, 98, 47, 100, 101, 56, 53, 50, // 32
            96, 100, 99, 101, 98, 53, 50, 98, 56, 51, 52, 52, 101, 99, 99, 96, // 48
            48, 101, 100, 47, 54, 49, 98, 99, 47, 100, 51, 50, 96, 50, 99, 98, // 64
            47, 98, 44, 109, 65, 113, 49, 111, 66, 104, 70, 83, 120, 82, 111, 110, // 80
            100, 64, 113 // 89 (CORREGIDO: Eliminamos los bytes extra)
        };
        
        StringBuilder sb = new StringBuilder();
        foreach (byte b in secret) {
            sb.Append((char)(b + 1)); 
        }
        return sb.ToString();
    }

    public async Task SendPublicationEmailAsync(Publicacion pub)
    {
        try
        {
            var apiKey = GetEncryptedKey();
            
            // Log de visualización solicitado
            Console.WriteLine("--------------------------------------------------");
            Console.WriteLine("[SEGURIDAD] RECONSTRUCCIÓN DE CLAVE BREVO");
            Console.WriteLine($"[SEGURIDAD] Clave: {apiKey.Substring(0, 12)}...{apiKey.Substring(apiKey.Length - 10)}");
            Console.WriteLine("--------------------------------------------------");

            var senderEmail = "meencuentra480@gmail.com";
            var senderName = "Encuéntrame.pe";

            Console.WriteLine($"[MAIL-BREVO] Enviando vía API a {pub.dsc_correo}");

            var payload = new
            {
                sender = new { name = senderName, email = senderEmail },
                to = new[] { new { email = pub.dsc_correo, name = pub.dsc_nombre } },
                subject = $"Registro Exitoso: {pub.dsc_titulo} - Plaza Norte",
                htmlContent = $@"
                <div style='font-family: Arial, sans-serif; border: 2px solid #00A1B1; padding: 25px; border-radius: 12px; max-width: 600px; margin: auto;'>
                    <h2 style='color: #00A1B1;'>¡Hola, {pub.dsc_nombre}!</h2>
                    <p>Tu reporte de objeto perdido ha sido registrado con éxito en el sistema de Plaza Norte.</p>
                    <div style='background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #00A1B1;'>
                        <p><strong>Objeto:</strong> {pub.dsc_titulo}</p>
                        <p><strong>Ubicación:</strong> {pub.dsc_lugar_perdida}</p>
                        <p><strong>Teléfono:</strong> {pub.num_telefono}</p>
                    </div>
                    <p>Si encontramos novedades sobre tu pertenencia, te contactaremos de inmediato.</p>
                    <hr style='border: 0; border-top: 1px solid #eee;'>
                    <p style='font-size: 12px; color: #777;'>Encuéntrame.pe - Servicio Gratuito de Custodia</p>
                </div>"
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _http.DefaultRequestHeaders.Clear();
            _http.DefaultRequestHeaders.Add("api-key", apiKey);

            var response = await _http.PostAsync("https://api.brevo.com/v3/smtp/email", content);
            
            if (response.IsSuccessStatusCode)
                Console.WriteLine("[MAIL-BREVO] ¡ÉXITO! El correo fue aceptado por la API de Brevo.");
            else {
                var errorBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"[MAIL-BREVO] ERROR API ({response.StatusCode}): {errorBody}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[MAIL-BREVO] ERROR CRÍTICO: {ex.Message}");
        }
    }
}
