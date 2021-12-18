using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.API.Dtos;
using ServerApp.API.Helper;
using ServerApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly YbBlogContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public ArticlesController(YbBlogContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }



        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddArticle(ArticleDto model, [FromHeader] string Authorization)
        {
            
            if(!ModelState.IsValid)
            {
                return BadRequest(new { Error = "Zorunlu alanlar uygun biçimde doldurulmalıdır!" });
            }
            var article = _mapper.Map<Article>(model);
            var userId = TokenHelper.FirstClaimByToken(Authorization.Substring(7), "nameid");
            if(await _userManager.FindByIdAsync(userId) == null)
            {
                return Unauthorized(new { Error = "Yetkisiz işlem" });
            }
            article.AppUser = null;
            article.AppUserId = userId;
            article.CreatedDate = DateTime.Now;
            try
            {
                await _context.Articles.AddAsync(article);
                await _context.SaveChangesAsync();
                return Ok(_mapper.Map<ArticleDto>(article));
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            
        }

        [Authorize]
        [HttpGet("myarticles")]
        public async Task<IActionResult> GetArticlesByUserId([FromHeader] string Authorization)
        {
            var userId = TokenHelper.FirstClaimByToken(Authorization.Substring(7), "nameid");
            if (await _userManager.FindByIdAsync(userId) == null)
            {
                return Unauthorized(new { Error = "Yetkisiz işlem" });
            }
            var articles = await _context.Articles.Where(x => x.AppUserId == userId).OrderByDescending(x => x.CreatedDate).ToListAsync();
            return Ok(_mapper.Map<List<ArticleDto>>(articles));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            var article = await _context.Articles.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            if (article != null) 
            {
                return Ok(_mapper.Map<ArticleDto>(article));
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            return Ok(_mapper.Map<List<ArticleDto>>(await _context.Articles.Include(x => x.AppUser).OrderByDescending(x => x.CreatedDate).ToListAsync()));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id, [FromHeader] string Authorization)
        {
            var userId = TokenHelper.FirstClaimByToken(Authorization.Substring(7), "nameid");
            var article = await _context.Articles.FindAsync(id);
            if(article == null)
            {
                return NotFound();
            }
            if(article.AppUserId != userId)
            {
                return Unauthorized();
            }
            try
            {
                _context.Articles.Remove(article);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            return NoContent();
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(int id, ArticleDto model, [FromHeader] string Authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Error = "Zorunlu alanlar uygun biçimde doldurulmalıdır!" });
            }
            if(model.Id != id)
            {
                return BadRequest();
            }
            var userId = TokenHelper.FirstClaimByToken(Authorization.Substring(7), "nameid");
            var article = await _context.Articles.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            if (article.AppUserId != userId)
            {
                return Unauthorized();
            }
            
            article.Title = model.Title;
            article.Content = model.Content;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            return Ok(_mapper.Map<ArticleDto>(article));
        }


        [HttpGet("getarticlesbysearchtext/{searchText}")]
        public async Task<IActionResult> GetArticlesBySearchText(string searchText)
        {
            if(string.IsNullOrEmpty(searchText) || string.IsNullOrWhiteSpace(searchText))
            {
                return BadRequest();
            }

            var articles = await _context.Articles.Include(x => x.AppUser).Where(x => x.Title.ToLower().Contains(searchText.ToLower())).ToListAsync();
            return Ok(_mapper.Map<List<ArticleDto>>(articles));
        }
    }
}
