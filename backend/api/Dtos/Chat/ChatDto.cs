using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;
using api.Models;

namespace api.Dtos.Chat
{
    public class ChatDto
    {
        public int ChatId { get; set; }
        public AppUserDto UserOne { get; set; }
        public AppUserDto UserTwo { get; set; }
        public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}