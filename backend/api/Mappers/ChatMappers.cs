using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Chat;
using api.Models;

namespace api.Mappers
{
    public static class ChatMappers
    {
        public static ChatDto ToChatDtoFromChat(this Chat chat)
        {
            return new ChatDto
            {
                ChatId = chat.ChatId,
                UserOne = chat.UserOne.ToAppUserDtoFromAppUser(),
                UserTwo = chat.UserTwo.ToAppUserDtoFromAppUser(),
                Messages = chat.Messages
            };
        }
    }
}