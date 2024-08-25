using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.AppUser;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]


    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly ICloudinaryImageService _cloudinaryImageService;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, ICloudinaryImageService cloudinaryImageService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _cloudinaryImageService = cloudinaryImageService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Email == loginDto.Email.ToLower());

            if (user == null)
            {
                return Unauthorized("Incorrect Email and/or Password");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {

                return Unauthorized("Incorrect Email and/or Password");
            }

            return Ok(
                new NewUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                if (registerDto.Password != registerDto.ConfirmPassword)
                {
                    return BadRequest("Password and Confirm Password do not match.");
                }
                var appUser = new AppUser
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Email = registerDto.Email,
                    UserName = registerDto.Email,
                    AvatarPublicId = "user",
                    Avatar = "https://res.cloudinary.com/df0vndgat/image/upload/v1723642117/user.png"
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    return Ok(new NewUserDto
                    {
                        Id = appUser.Id,
                        Email = appUser.Email,
                        Token = _tokenService.CreateToken(appUser)
                    }
                    );
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }
        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateDto updateUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }
            var user = await _userManager.FindByIdAsync(userId);

            if (!string.IsNullOrEmpty(updateUserDto.Email) && updateUserDto.Email.ToLower() != user.Email.ToLower())
            {

                var emailInUse = await _userManager.FindByEmailAsync(updateUserDto.Email.ToLower());
                if (emailInUse != null && emailInUse.Id != userId)
                {
                    return BadRequest("The email is already in use");
                }

                var setEmailResult = await _userManager.SetEmailAsync(user, updateUserDto.Email);

                if (!setEmailResult.Succeeded)
                {
                    return BadRequest(setEmailResult.Errors);
                }
                await _userManager.SetUserNameAsync(user, updateUserDto.Email);
            }

            if (!string.IsNullOrEmpty(updateUserDto.NewPassword))
            {
                var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, updateUserDto.OldPassword, false);
                if (!passwordCheck.Succeeded)
                {
                    return Unauthorized("Incorrect old password");
                }

                var passwordChangeResult = await _userManager.ChangePasswordAsync(user, updateUserDto.OldPassword, updateUserDto.NewPassword);
                if (!passwordChangeResult.Succeeded)
                {
                    return BadRequest(passwordChangeResult.Errors);
                }
            }


            if (updateUserDto.Avatar != null)
            {
                var Overwrite = user.AvatarPublicId != "user" ? true : false;
                var PublicId = Overwrite ? user.AvatarPublicId : "";
                var UseFilename = Overwrite ? true : false;
                var uploadResult = await _cloudinaryImageService.UploadImageToCloudinary(updateUserDto.Avatar, "Users", Overwrite, PublicId, UseFilename);
                if (uploadResult.StatusCode != HttpStatusCode.OK)
                {
                    return BadRequest(uploadResult.Error.Message);
                }

                user.Avatar = uploadResult.SecureUrl.ToString();
                user.AvatarPublicId = uploadResult.PublicId;
            }
            else if (updateUserDto.DeletedAvatarId != null && updateUserDto.DeletedAvatarId != "user")
            {
                var result = await _cloudinaryImageService.DeleteImagesAsync([updateUserDto.DeletedAvatarId]);
                if (result.StatusCode != HttpStatusCode.OK)
                {
                    return BadRequest(result.Error.Message);
                }
                user.Avatar = "https://res.cloudinary.com/df0vndgat/image/upload/v1723642117/user.png";
                user.AvatarPublicId = "user";

            }
            user.Email = user.Email;
            user.UserName = user.UserName;
            user.PasswordHash = user.PasswordHash;
            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return StatusCode(500, "Failed to update user");
            }

            return Ok(new AppUserDto
            {
                UserId = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Avatar = user.Avatar
            });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok("Logged out successfully");
        }

        [HttpGet("data")]
        [Authorize]
        public async Task<IActionResult> GetAllUserData()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User not authenticated" });
            }
            var user = await _userManager.Users
                                     .Include(u => u.Products)
                                     .ThenInclude(p => p.Category)

                                     .Include(u => u.Products)
                                     .ThenInclude(p => p.Images)

                                     .Include(u => u.Products)
                                     .ThenInclude(p => p.Reviews)

                                    .Include(u => u.Services)
                                     .ThenInclude(s => s.Category)

                                     .Include(u => u.Services)
                                     .ThenInclude(s => s.Images)

                                     .Include(u => u.Services)
                                     .ThenInclude(s => s.Reviews)

                                     .Include(u => u.Favorites)
                                     .ThenInclude(f => f.Product)
                                     .ThenInclude(p => p.Images)

                                    .Include(u => u.Favorites)
                                     .ThenInclude(f => f.Product)
                                     .ThenInclude(p => p.Reviews)

                                     .Include(u => u.Favorites)
                                     .ThenInclude(f => f.Service)
                                     .ThenInclude(s => s.Images)

                                     .Include(u => u.Favorites)
                                     .ThenInclude(f => f.Service)
                                     .ThenInclude(s => s.Reviews)


                                     .FirstOrDefaultAsync(u => u.Id == userId);

            var userDtos = user?.ToAppUserSpecificDtoFromAppUser();
            return Ok(userDtos);
        }
    }
}
