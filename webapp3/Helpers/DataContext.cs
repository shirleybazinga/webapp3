using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using webapp3.Entities;

namespace webapp3.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = Configuration.GetConnectionString("MyDbConnection");
            options.UseMySql(connectionString, o =>
            {
                o.EnableRetryOnFailure(10);
            });
        }

        public DbSet<User> Users { get; set; }
    }
}
