using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Models
{
    public class YbBlogContext:IdentityDbContext<AppUser,AppRole,string>
    {
        public YbBlogContext(DbContextOptions<YbBlogContext> options):base(options)
        {

        }

        public DbSet<Article> Articles { get; set; }
    }
}
