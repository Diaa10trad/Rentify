using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Chat;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;

        public ChatHub(ChatService chatService)
        {
            _chatService = chatService;
        }
        public async Task<ChatDto> StartChatAsync(string UserOneId, string UserTwoId)
        {
            var chat = await _chatService.GetOrCreateChatAsync(UserOneId, UserTwoId);
            await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());
            return chat.ToChatDtoFromChat();
        }

        public async Task SendMessageAsync(int chatId, string message)
        {
            try
            {

                var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    throw new Exception("User is not authenticated");
                }
                await _chatService.AddMessageToChatAsync(chatId, userId, message);
                await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", userId, message);
            }
            catch (Exception ex)
            {
                //Log the error(you could use a logging framework like Serilog, NLog, etc.)
                Console.WriteLine($"Error in SendMessageAsync: {ex.Message}");

                //Optionally, notify the client about the error
                await Clients.Caller.SendAsync("ReceiveError", "An error occurred while sending the message.");
            }
            //await _chatService.AddMessageToChatAsync(chatId, Context.UserIdentifier, message);
            //await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", Context.UserIdentifier, message);
        }
    }


}