using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ChatMessage
    {
        [Key]
        public int ChatMessageId { get; set; }
        public int ChatId { get; set; }
        public string SenderId { get; set; } = null!;
        public AppUser Sender { get; set; } = null!;
        public string Message { get; set; } = null!;
        public DateTime SentAt { get; set; }

    }
}