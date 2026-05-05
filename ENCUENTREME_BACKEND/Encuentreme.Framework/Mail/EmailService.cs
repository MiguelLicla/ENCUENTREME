using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Encuentreme.Entities.Entities;

namespace Encuentreme.Framework.Mail;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendPublicationEmailAsync(Publicacion pub)
    {
        try
        {
            var smtpServer = _config["Smtp:Server"];
            var smtpPort = int.Parse(_config["Smtp:Port"] ?? "587");
            var senderEmail = _config["Smtp:SenderEmail"];
            var senderName = _config["Smtp:SenderName"];
            var password = _config["Smtp:Password"];

            Console.WriteLine($"[MAIL] Intentando enviar correo a: {pub.dsc_correo} para el objeto: {pub.dsc_titulo}");
            Console.WriteLine($"[MAIL] Servidor: {smtpServer}, Puerto: {smtpPort}, Remitente: {senderEmail}");

            var toEmail = pub.dsc_correo;
            if (string.IsNullOrEmpty(toEmail))
            {
                Console.WriteLine("[MAIL] Error: El correo del destinatario está vacío.");
                return;
            }

            var body = $@"
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <style>
        body {{ font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0; }}
        .wrapper {{ width: 100%; table-layout: fixed; background-color: #f0f2f5; padding-bottom: 40px; }}
        .main {{ background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; color: #4a4a4a; border-radius: 12px; overflow: hidden; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }}
        .header {{ background-color: #00A1B1; padding: 40px 20px; text-align: center; color: #ffffff; }}
        .header h1 {{ margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }}
        .content {{ padding: 40px 30px; }}
        .content h2 {{ color: #1a1a1a; font-size: 22px; margin-top: 0; margin-bottom: 20px; }}
        .content p {{ font-size: 16px; line-height: 1.6; color: #5a5a5a; }}
        .item-card {{ background-color: #f8fafb; border: 1px solid #e1e8ed; border-radius: 10px; padding: 25px; margin: 30px 0; }}
        .item-card h3 {{ margin-top: 0; color: #00A1B1; font-size: 18px; border-bottom: 1px solid #e1e8ed; padding-bottom: 10px; margin-bottom: 15px; }}
        .detail-row {{ margin-bottom: 10px; display: flex; }}
        .detail-label {{ font-weight: bold; color: #7a7a7a; width: 140px; flex-shrink: 0; font-size: 14px; text-transform: uppercase; }}
        .detail-value {{ color: #1a1a1a; font-size: 15px; }}
        .image-box {{ width: 100%; text-align: center; margin-top: 20px; }}
        .image-box img {{ max-width: 100%; border-radius: 8px; border: 1px solid #e1e8ed; }}
        .footer {{ text-align: center; padding: 30px; font-size: 13px; color: #9b9b9b; line-height: 1.5; }}
        .accent {{ color: #00A1B1; font-weight: bold; }}
    </style>
</head>
<body>
    <div class='wrapper'>
        <div class='main'>
            <div class='header'>
                <h1>Encuéntrame<span style='color: #e6f7f9;'>.pe</span></h1>
                <p style='margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;'>Reporte Oficial de Objeto Perdido</p>
            </div>
            <div class='content'>
                <h2>¡Hola, {pub.dsc_nombre}!</h2>
                <p>Tu reporte ha sido recibido con éxito. En <span class='accent'>Encuéntrame.pe</span> nos tomamos muy en serio la seguridad y bienestar de nuestra comunidad en <span class='accent'>Plaza Norte</span>.</p>
                
                <div class='item-card'>
                    <h3>Detalles del Objeto</h3>
                    <div class='detail-row'><span class='detail-label'>Título:</span> <span class='detail-value'>{pub.dsc_titulo}</span></div>
                    <div class='detail-row'><span class='detail-label'>Categoría:</span> <span class='detail-value'>{pub.dsc_tipo}</span></div>
                    <div class='detail-row'><span class='detail-label'>Ubicación:</span> <span class='detail-value'>{pub.dsc_lugar_perdida}</span></div>
                    <div class='detail-row'><span class='detail-label'>Fecha:</span> <span class='detail-value'>{pub.fch_perdida?.ToString("dd/MM/yyyy")}</span></div>
                    <div class='detail-row'><span class='detail-label'>Marca/Color:</span> <span class='detail-value'>{pub.dsc_marca} / {pub.dsc_color}</span></div>

                    {( !string.IsNullOrEmpty(pub.dsc_imagen) ? $@"<div class='image-box'><img src='{pub.dsc_imagen}' alt='Foto del objeto' /></div>" : "" )}
                </div>

                <p>Nuestro equipo de seguridad revisará esta información. Si alguien entrega un objeto que coincida con tu descripción, te avisaremos de inmediato a través de este correo o al teléfono <span class='accent'>{pub.num_telefono}</span>.</p>
                
                <p style='margin-top: 40px;'>Atentamente,<br><strong>El Equipo de Seguridad de Plaza Norte</strong></p>
            </div>
            <div class='footer'>
                &copy; {DateTime.Now.Year} Encuéntrame.pe &bull; Lima, Perú<br>
                Este correo fue enviado a {pub.dsc_correo} porque registraste un objeto perdido en nuestro portal.<br>
                <strong>Plaza Norte - Cuidando lo que más quieres.</strong>
            </div>
        </div>
    </div>
</body>
</html>";

            var mailMessage = new MailMessage
            {
                From = new MailAddress(senderEmail!, senderName),
                Subject = $"Confirmación de Reporte: {pub.dsc_titulo} - Encuéntrame.pe",
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.To.Add(toEmail);

            using var smtpClient = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(senderEmail, password),
                EnableSsl = true
            };

            await smtpClient.SendMailAsync(mailMessage);
            Console.WriteLine("[MAIL] Correo enviado exitosamente.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[MAIL] ERROR CRÍTICO enviando correo: {ex.Message}");
            if (ex.InnerException != null)
                Console.WriteLine($"[MAIL] Inner Error: {ex.InnerException.Message}");
        }
    }
}
