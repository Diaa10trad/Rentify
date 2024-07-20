using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set;}

        [Required]
        [EmailAddress]
        public required string Email { get; set;}

        [Required]
        public required string Password { get; set;}
    }
}