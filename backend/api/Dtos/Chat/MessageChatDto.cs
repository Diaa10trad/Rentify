using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppUser;

namespace api.Dtos.Chat
{
    public class MessageChatDto
    {
        public int ChatMessageId { get; set; }
        public AppUserDto Sender { get; set; } = null!;
        public string Message { get; set; } = null!;
        public DateTime SentAt { get; set; }
    }
}