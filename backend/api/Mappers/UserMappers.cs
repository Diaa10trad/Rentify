using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static UserBookingDto ToUserBookingDtoFromAppUser(this AppUser appUser)
        {
            return new UserBookingDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,
            };
        }

        public static AppUserDto ToAppUserDtoFromAppUser(this AppUser appUser)
        {
            return new AppUserDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Avatar = appUser.Avatar,
            };
        }
    }
}