using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Models
{
    public static class SeedIdentity
    {
        public static async Task Seed(UserManager<AppUser> _userManager, RoleManager<AppRole> _roleManager, IConfiguration configuration)
        {
            var username = configuration["SeedIdentity:username"];
            var email = configuration["SeedIdentity:email"];
            var password = configuration["SeedIdentity:password"];
            var role = configuration["SeedIdentity:role"];

            if (!_userManager.Users.Any())
            {
                if (!await _roleManager.RoleExistsAsync("admin"))
                {
                    await _roleManager.CreateAsync(new AppRole { Name = role });
                }
                var user = new AppUser
                {
                    UserName = username,
                    Email = email,
                    Name = "Vhb",
                    LastName = "Ozdgn",
                    EmailConfirmed = true
                };
                var result = await _userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }
            return;
        }
    }
}
