using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
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
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager) {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(user => user.Email == loginDto.Email.ToLower());

            if (user == null) {
                return Unauthorized("Incorrect Email and/or Password");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) {

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
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto) {
            try
            {
                if(!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser 
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Email = registerDto.Email,
                    UserName = registerDto.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded) {
                    return Ok(new NewUserDto 
                            {
                                Id = appUser.Id, 
                                Email = appUser.Email, 
                                Token = _tokenService.CreateToken(appUser)
                            }
                    );
                }
                else {
                    return StatusCode(500, createdUser.Errors);
                }
           
            }
            catch (Exception e)
            {
                
               return StatusCode(500, e);
            }
        }
    }
}