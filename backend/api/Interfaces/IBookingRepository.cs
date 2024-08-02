using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IBookingRepository
    {
        public Task<Booking?> GetByIdAsync(string role, int bookingId, string RequesterId);
        public Task<List<Booking>?> GetAllAsync(string role, string RequesterId);

        public Task<Booking?> UpdateAsync(string role, int bookingId, Booking bookingModel, string RequesterId);

        public Task<Booking?> CreateAsync(Booking bookingModel, string RequesterId);
        public Task<Booking?> DeleteAsync(int bookingId, string RequesterId);
    }
}