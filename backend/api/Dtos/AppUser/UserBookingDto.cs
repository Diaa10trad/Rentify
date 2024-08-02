using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppUser
{
    public class UserBookingDto
    {
        public string UserId { get; set;} = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set;} = string.Empty;
    }
}