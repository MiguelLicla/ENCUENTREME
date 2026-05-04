namespace Encuentreme.Framework.Response;

public class ReturnValue
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public int Id { get; set; }

    public static ReturnValue Fail(string message) => new() { Success = false, Message = message };
    public static ReturnValue Ok(string message = "", string code = "") => new() { Success = true, Message = message, Code = code };
}
