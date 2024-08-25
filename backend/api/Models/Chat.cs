using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;

namespace api.Models
{
    public class Chat
    {

        public int ChatId { get; set; }
        public string UserOneId { get; set; } = null!;
        public AppUser UserOne { get; set; }
        public string UserTwoId { get; set; } = null!;
        public AppUser UserTwo { get; set; }
        public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();

    }
}