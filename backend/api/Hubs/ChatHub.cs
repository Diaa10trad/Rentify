using System;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Chat;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.SignalR;
using api.Interfaces;

namespace api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;
        private readonly IBookingProductRepository _bookingProductRepository;
        private readonly IBookingServiceRepository _bookingServiceRepository;
        public ChatHub(ChatService chatService, IBookingProductRepository bookingProductRepository, IBookingServiceRepository bookingServiceRepository)
        {
            _chatService = chatService;
            _bookingProductRepository = bookingProductRepository;
            _bookingServiceRepository = bookingServiceRepository;

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

        }
        public async Task SendMessageBookingAsync(int chatId, string message)
        {
            try
            {
                var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    throw new Exception("User is not authenticated");
                }


                var bookingMessage = JsonSerializer.Deserialize<BookingMessage>(message);
                if (bookingMessage == null)
                {
                    throw new Exception("Failed to deserialize the booking message.");
                }
                var bookingData = bookingMessage.data;
                if (bookingData == null)
                {
                    throw new Exception("There is no booking Data");
                }
                DateTime? startDate = bookingData.startDate;
                DateTime? endDate = bookingData.endDate;
                Booking? bookingModel = null;
                if (bookingData != null)
                {

                    if (bookingData.itemType == "service")
                    {
                        var bookingCreateOrUpdateModel = new Booking
                        {
                            ServiceId = bookingData.itemId,
                            OwnerId = bookingData.ownerId,
                            RenterId = bookingData.renterId,
                            AdditionalInfo = bookingData.additionalInfo,
                            StartDate = startDate,
                            EndDate = endDate,
                            FinalPrice = bookingData.finalPrice,
                            CancellationPolicy = new CancellationPolicy { Refund = bookingData.refund, PermittedDuration = bookingData.permittedDuration },

                        };

                        if (bookingData.bookingId == null)
                        {

                            bookingModel = await _bookingServiceRepository.CreateAsync(bookingCreateOrUpdateModel, userId);
                        }
                        else
                        {

                            bookingModel = await _bookingServiceRepository.UpdateAsync("owner", bookingData.bookingId.GetValueOrDefault(), bookingCreateOrUpdateModel, userId);
                        }
                    }
                    else if (bookingData.itemType == "product")
                    {
                        var bookingCreateOrUpdateModel = new Booking
                        {
                            ProductId = bookingData.itemId,
                            OwnerId = bookingData.ownerId,
                            RenterId = bookingData.renterId,
                            AdditionalInfo = bookingData.additionalInfo,
                            StartDate = startDate,
                            EndDate = endDate,
                            FinalPrice = bookingData.finalPrice,
                            CancellationPolicy = new CancellationPolicy { Refund = bookingData.refund, PermittedDuration = bookingData.permittedDuration },

                        };

                        if (bookingData.bookingId == null)
                        {

                            bookingModel = await _bookingProductRepository.CreateAsync(bookingCreateOrUpdateModel, userId);
                        }
                        else
                        {

                            bookingModel = await _bookingProductRepository.UpdateAsync("owner", bookingData.bookingId.GetValueOrDefault(), bookingCreateOrUpdateModel, userId);
                        }

                    }

                }

                if (bookingModel != null)
                {
                    bookingData.bookingId = bookingModel.BookingId;

                    var updatedMessage = JsonSerializer.Serialize(bookingMessage);

                    await _chatService.AddMessageToChatAsync(chatId, userId, updatedMessage);
                    await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", userId, updatedMessage);
                }

            }
            catch (Exception ex)
            {
                // Log the error (you could use a logging framework like Serilog, NLog, etc.)
                Console.WriteLine($"Error in SendMessageBookingAsync: {ex.Message}");

                // Optionally, notify the client about the error
                await Clients.Caller.SendAsync("ReceiveError", "An error occurred while sending the booking message.");
            }
        }
    }


}