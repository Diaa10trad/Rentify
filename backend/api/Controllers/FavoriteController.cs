using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Favorite;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/favorite")]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        public FavoriteController(IFavoriteRepository favoriteRepository)
        {
            _favoriteRepository = favoriteRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {

            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var favorites = await _favoriteRepository.GetAllFavoritesAsync(RequesterId);

            var favoriteDto = favorites.Select(favorite => favorite.ToFavoriteDtoFromFavorite());

            return Ok(favoriteDto);
        }

        [HttpGet("{itemType}/{itemId}")]
        [Authorize]
        public async Task<IActionResult> GetOne([FromRoute] int itemId, [FromRoute] string itemType)
        {
            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var favorite = await _favoriteRepository.GetFavoriteOneAsync(itemId, itemType, RequesterId);

            if (favorite == null)
            {
                return NotFound();
            }

            var favoriteDto = favorite.ToFavoriteDtoFromFavorite();
            return Ok(favoriteDto);
        }

        [HttpPost("{itemType}/{itemId}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int itemId, [FromRoute] string itemType)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (RequesterId == null)
            {
                return Unauthorized();
            }

            var favoriteModel = new Favorite
            {
                UserId = RequesterId,
                ItemType = itemType,
            };

            int mappedId = 0;
            if (itemType == "product")
            {
                favoriteModel.ProductId = itemId;
                mappedId = favoriteModel.ProductId.Value; // Assuming ProductId is nullable
            }
            else if (itemType == "service")
            {
                favoriteModel.ServiceId = itemId;
                mappedId = favoriteModel.ServiceId.Value; // Assuming ServiceId is nullable
            }
            await _favoriteRepository.CreateFavoriteAsync(favoriteModel);



            return CreatedAtAction(nameof(GetOne), new { itemType = favoriteModel.ItemType, itemId = mappedId }, favoriteModel.ToFavoriteDtoFromFavorite());

        }

        [HttpDelete("{itemType}/{itemId}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int itemId, [FromRoute] string itemType)
        {
            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (RequesterId == null)
            {
                return Unauthorized();
            }
            var favoriteModel = await _favoriteRepository.DeleteFavoriteAsync(itemId, itemType, RequesterId);

            if (favoriteModel == null)
            {
                return NotFound("favorite not found");
            }

            return Ok(favoriteModel);
        }
    }
}