using Encuentreme.Framework.Db;

namespace Encuentreme.Data.Repositories;

public class DashboardData
{
    public string ListarReporte()
        => DbQuery.Exec("public.con_dashboard_lis")
            .ToJson();
}
