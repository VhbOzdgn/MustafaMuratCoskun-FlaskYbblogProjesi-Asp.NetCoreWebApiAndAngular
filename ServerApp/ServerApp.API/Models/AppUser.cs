﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Models
{
    public class AppUser:IdentityUser
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public virtual ICollection<Article> Articles { get; set; }
    }
}
