using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ServerApp.API.Dtos;
using ServerApp.API.Helper;
using ServerApp.API.Models;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //private readonly YbBlogContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<AppUser> userManager, IMapper mapper, IConfiguration configuration)
        {
            //_context = context;
            _userManager = userManager;
            _mapper = mapper;
            _configuration = configuration;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUser model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new { Error = "Zorunlu alanlar uygun biçimde doldurulmalıdır!"});
            }
            var user = _mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(user, model.Password);
            if(result.Succeeded)
            {
                return Ok(_mapper.Map<AppUserDto>(user));
            }
            return BadRequest(result.Errors.ToList());
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUser model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new { Error = "Zorunlu alanlar uygun biçimde doldurulmalıdır!" });
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if(user == null)
            {
                return BadRequest(new { Error = "Kullanıcı adı veya parola hatalı!" });
            }
            if(!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return BadRequest(new { Error = "Kullanıcı adı veya parola hatalı!" });
            }
            return Ok(new { 
                Token = user.GenerateJwtToken(_configuration)
            });
        }





    }
}
