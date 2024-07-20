using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class editeditemsreviews : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Item_CancellationPolicy_CancellationPolicyId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Item_Categories_CategoryId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Item_Location_LocationId",
                table: "Item");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Item_ItemId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ItemId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Item",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "PriceDaily",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "PriceMonthly",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "PriceWeekly",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "ProductCondition",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Item");

            migrationBuilder.RenameTable(
                name: "Item",
                newName: "Services");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Reviews",
                newName: "ReviewId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Services",
                newName: "ServiceId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_OwnerId",
                table: "Services",
                newName: "IX_Services_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_LocationId",
                table: "Services",
                newName: "IX_Services_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_CategoryId",
                table: "Services",
                newName: "IX_Services_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Item_CancellationPolicyId",
                table: "Services",
                newName: "IX_Services_CancellationPolicyId");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Reviews",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Services",
                table: "Services",
                column: "ServiceId");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CancellationPolicyId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ProductCondition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    PriceMonthly = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PriceWeekly = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PriceDaily = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_CancellationPolicy_CancellationPolicyId",
                        column: x => x.CancellationPolicyId,
                        principalTable: "CancellationPolicy",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductId",
                table: "Reviews",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ServiceId",
                table: "Reviews",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CancellationPolicyId",
                table: "Products",
                column: "CancellationPolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_LocationId",
                table: "Products",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_OwnerId",
                table: "Products",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Products_ProductId",
                table: "Reviews",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Services_ServiceId",
                table: "Reviews",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AspNetUsers_OwnerId",
                table: "Services",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_CancellationPolicy_CancellationPolicyId",
                table: "Services",
                column: "CancellationPolicyId",
                principalTable: "CancellationPolicy",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Categories_CategoryId",
                table: "Services",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Location_LocationId",
                table: "Services",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Products_ProductId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Services_ServiceId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_AspNetUsers_OwnerId",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_CancellationPolicy_CancellationPolicyId",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Categories_CategoryId",
                table: "Services");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Location_LocationId",
                table: "Services");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ProductId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ServiceId",
                table: "Reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Services",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Reviews");

            migrationBuilder.RenameTable(
                name: "Services",
                newName: "Item");

            migrationBuilder.RenameColumn(
                name: "ReviewId",
                table: "Reviews",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ServiceId",
                table: "Item",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Services_OwnerId",
                table: "Item",
                newName: "IX_Item_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_LocationId",
                table: "Item",
                newName: "IX_Item_LocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_CategoryId",
                table: "Item",
                newName: "IX_Item_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Services_CancellationPolicyId",
                table: "Item",
                newName: "IX_Item_CancellationPolicyId");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Item",
                type: "nvarchar(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "PriceDaily",
                table: "Item",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceMonthly",
                table: "Item",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceWeekly",
                table: "Item",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductCondition",
                table: "Item",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Item",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Item",
                table: "Item",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ItemId",
                table: "Reviews",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Item_AspNetUsers_OwnerId",
                table: "Item",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Item_CancellationPolicy_CancellationPolicyId",
                table: "Item",
                column: "CancellationPolicyId",
                principalTable: "CancellationPolicy",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Categories_CategoryId",
                table: "Item",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Item_Location_LocationId",
                table: "Item",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Item_ItemId",
                table: "Reviews",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
