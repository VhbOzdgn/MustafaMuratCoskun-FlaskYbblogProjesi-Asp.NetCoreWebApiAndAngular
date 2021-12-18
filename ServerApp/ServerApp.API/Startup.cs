using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ServerApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<YbBlogContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("Sqlite"));
            });
            services.AddIdentity<AppUser, AppRole>(setup =>
            {
                setup.User.RequireUniqueEmail = true;

                setup.Password.RequireDigit = true;
                setup.Password.RequiredLength = 6;
                setup.Password.RequireLowercase = false;
                setup.Password.RequireNonAlphanumeric = false;
                setup.Password.RequireUppercase = false;

                setup.Lockout.AllowedForNewUsers = false;
                setup.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                setup.Lockout.MaxFailedAccessAttempts = 10;

            }).AddEntityFrameworkStores<YbBlogContext>();

            

            services.AddCors(options => {
                options.AddPolicy(
                    name: "MyAllowOrigins",
                    builder => {
                        builder
                        .WithOrigins("http://localhost:4200", "https://localhost:4200")
                        //.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    }
                );
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Secret").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = true
                    
                };
            });

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure
            (IApplicationBuilder app,
            IWebHostEnvironment env,
            IConfiguration _configuration,
            UserManager<AppUser> _userManager,
            RoleManager<AppRole> _roleManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("MyAllowOrigins");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            SeedIdentity.Seed(_userManager, _roleManager, _configuration).Wait();
        }
    }
}
