using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName", "CategoryType" },
                values: new object[,]
                {
                    { 1, "أدوات ومعدات", "product" },
                    { 2, "سيارات ومركبات", "product" },
                    { 3, "الإلكترونيات", "product" },
                    { 4, "أجهزة إلكترونية", "product" },
                    { 5, "المطبخ والمنزل", "product" },
                    { 6, "معدات البستنة", "product" },
                    { 7, "أدوات رياضية", "product" },
                    { 8, "أدوات الحيوانات الأليفة", "product" },
                    { 9, "الفنون والحرف", "product" },
                    { 10, "السفر والأمتعة", "product" },
                    { 11, "الكرفانات", "product" },
                    { 12, "الآلات الموسيقية", "product" },
                    { 13, "الحفلات والمناسبات", "product" },
                    { 14, "الملابس والبدلات", "product" },
                    { 15, "المعدات الطبية", "product" },
                    { 16, "ألعاب الطاولة والألغاز", "product" },
                    { 17, "مستلزمات التعلم", "product" },
                    { 18, "الألعاب الإلكترونية", "product" },
                    { 19, "المركبات المائية", "product" },
                    { 20, "أثاث المنزل", "product" },
                    { 21, "مستلزمات المكتب", "product" },
                    { 22, "معدات البناء", "product" },
                    { 23, "معدات الصيد", "product" },
                    { 24, "مستلزمات التخييم", "product" },
                    { 25, "مستلزمات الخياطة", "product" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
