using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions) {

        }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             base.OnModelCreating(modelBuilder);

            var initialCategories = new List<Category>
            {
                new Category { Id = 1, CategoryName = "أدوات ومعدات", CategoryType = "product" },
                new Category { Id = 2, CategoryName = "سيارات ومركبات", CategoryType = "product" },
                new Category { Id = 3, CategoryName = "الإلكترونيات", CategoryType = "product" },
                new Category { Id = 4, CategoryName = "أجهزة إلكترونية", CategoryType = "product" },
                new Category { Id = 5, CategoryName = "المطبخ والمنزل", CategoryType = "product" },
                new Category { Id = 6, CategoryName = "معدات البستنة", CategoryType = "product" },
                new Category { Id = 7, CategoryName = "أدوات رياضية", CategoryType = "product" },
                new Category { Id = 8, CategoryName = "أدوات الحيوانات الأليفة", CategoryType = "product" },
                new Category { Id = 9, CategoryName = "الفنون والحرف", CategoryType = "product" },
                new Category { Id = 10, CategoryName = "السفر والأمتعة", CategoryType = "product" },
                new Category { Id = 11, CategoryName = "الكرفانات", CategoryType = "product" },
                new Category { Id = 12, CategoryName = "الآلات الموسيقية", CategoryType = "product" },
                new Category { Id = 13, CategoryName = "الحفلات والمناسبات", CategoryType = "product" },
                new Category { Id = 14, CategoryName = "الملابس والبدلات", CategoryType = "product" },
                new Category { Id = 15, CategoryName = "المعدات الطبية", CategoryType = "product" },
                new Category { Id = 16, CategoryName = "ألعاب الطاولة والألغاز", CategoryType = "product" },
                new Category { Id = 17, CategoryName = "مستلزمات التعلم", CategoryType = "product" },
                new Category { Id = 18, CategoryName = "الألعاب الإلكترونية", CategoryType = "product" },
                new Category { Id = 19, CategoryName = "المركبات المائية", CategoryType = "product" },
                new Category { Id = 20, CategoryName = "أثاث المنزل", CategoryType = "product" },
                new Category { Id = 21, CategoryName = "مستلزمات المكتب", CategoryType = "product" },
                new Category { Id = 22, CategoryName = "معدات البناء", CategoryType = "product" },
                new Category { Id = 23, CategoryName = "معدات الصيد", CategoryType = "product" },
                new Category { Id = 24, CategoryName = "مستلزمات التخييم", CategoryType = "product" },
                new Category { Id = 25, CategoryName = "مستلزمات الخياطة", CategoryType = "product" }
            };

            modelBuilder.Entity<Category>().HasData(initialCategories);            
        }
    }
}