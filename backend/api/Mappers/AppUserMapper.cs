using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUserDto;
using api.Models;

namespace api.Mappers
{
    public static class AppUserMapper
    {
        public static AppUserReviewDto ToAppUserReviewDtoFromAppUser(this AppUser appUser)
        {
            return new AppUserReviewDto
            {
                UserId = appUser.Id,
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
            };
        }
    }
}