using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ServerApp.API.Dtos;
using ServerApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Helper
{
    public class MappingProfile:Profile
    {
        public  MappingProfile()
        {
            CreateMap<RegisterUser, AppUser>().ReverseMap();
            CreateMap<AppUser,AppUserDto>().ReverseMap();
            CreateMap<Article, ArticleDto>().ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.AppUser.UserName));
            CreateMap<ArticleDto, Article>();
        }
    }
}
