using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class UserUpdateDto
    {
        public string? Email { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public IFormFile? Avatar { get; set; }
        public string? DeletedAvatarId { get; set; }
    }
}