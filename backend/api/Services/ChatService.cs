using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Chat;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{

    public class ChatService
    {
        private readonly ApplicationDBContext _dbContext;

        public ChatService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Chat> GetOrCreateChatAsync(string UserOneId, string UserTwoId)
        {
            var chat = await _dbContext.Chats.Include(c => c.Messages)
                                             .Include(c => c.UserOne)
                                             .Include(c => c.UserTwo)
                                             .FirstOrDefaultAsync(c => (c.UserOneId == UserOneId && c.UserTwoId == UserTwoId) || (c.UserOneId == UserTwoId && c.UserTwoId == UserOneId));
            if (chat == null)
            {

                await _dbContext.Chats.AddAsync(new Chat
                {
                    UserOneId = UserOneId,
                    UserTwoId = UserTwoId,

                });
                await _dbContext.SaveChangesAsync();

                chat = await _dbContext.Chats.Include(c => c.Messages)
                                             .Include(c => c.UserOne)
                                             .Include(c => c.UserTwo)
                                             .FirstOrDefaultAsync(c => (c.UserOneId == UserOneId && c.UserTwoId == UserTwoId) || (c.UserOneId == UserTwoId && c.UserTwoId == UserOneId));

            }
            return chat;
        }

        public async Task<List<Chat>> GetUserChatsAsync(string CurrentUserId)
        {
            return await _dbContext.Chats.Include(c => c.Messages)
                                            .ThenInclude(m => m.Sender)
                                          .Include(c => c.UserOne)
                                          .Include(c => c.UserTwo)
                                          .Where(c => c.UserOneId == CurrentUserId || c.UserTwoId == CurrentUserId).ToListAsync();

        }

        public async Task AddMessageToChatAsync(int chatId, string senderId, string message)
        {
            var chat = await _dbContext.Chats.Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.ChatId == chatId);
            if (chat != null)
            {
                chat.Messages.Add(new ChatMessage
                {
                    SenderId = senderId,
                    Message = message,
                    SentAt = DateTime.Now
                });

                await _dbContext.SaveChangesAsync();
            }
        }

    }


}