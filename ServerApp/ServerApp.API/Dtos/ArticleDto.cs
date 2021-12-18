using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.API.Dtos
{
    public class ArticleDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100,MinimumLength =5)]
        public string Title { get; set; }
        [Required]
        [StringLength(5000, MinimumLength = 10)]
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Author { get; set; }
    }
}
