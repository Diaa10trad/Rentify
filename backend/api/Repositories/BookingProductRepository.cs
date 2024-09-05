using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class BookingProductRepository : IBookingProductRepository
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IProductRepository _productRepository;
        public BookingProductRepository(ApplicationDBContext dbContext, IProductRepository productRepository)
        {
            _dbContext = dbContext;
            _productRepository = productRepository;
        }
        public async Task<Booking?> CreateAsync(Booking bookingModel, string RequesterId)
        {
            var productModel = await _productRepository.GetProductByIdAsync((int)bookingModel.ProductId);
            if (productModel == null || productModel.OwnerId != RequesterId || bookingModel.RenterId == productModel.OwnerId)
            {
                return null;
            }

            await _dbContext.Bookings.AddAsync(bookingModel);
            await _dbContext.SaveChangesAsync();
            return bookingModel;

        }

        public async Task<Booking?> DeleteAsync(int bookingId, string RequesterId)
        {
            var bookingModel = await _dbContext.Bookings.Include(B => B.CancellationPolicy).FirstOrDefaultAsync(B => B.BookingId == bookingId && B.OwnerId == RequesterId);
            if (bookingModel == null || bookingModel.ProductId == null)
            {
                return null;
            }
            if (bookingModel.Status != "pending")
            {
                throw new Exception("You cannot delete the booking");
            }
            _dbContext.CancellationPolicies.Remove(bookingModel.CancellationPolicy);
            _dbContext.Bookings.Remove(bookingModel);
            await _dbContext.SaveChangesAsync();

            return bookingModel;
        }

        public async Task<List<Booking>?> GetAllAsync(string role, string RequesterId)
        {
            if (role == "renter")
                return await _dbContext.Bookings.Include(B => B.Product)
                                                    .ThenInclude(pb => pb.Images)
                                                             .Include(B => B.CancellationPolicy)
                                                             .Include(B => B.Owner)
                                                             .Include(B => B.Renter)
                                                             .Where(B => B.RenterId == RequesterId && B.ProductId != null)
                                                             .ToListAsync();
            else if (role == "owner")
                return await _dbContext.Bookings.Include(B => B.Product)
                                                    .ThenInclude(pb => pb.Images)
                                                             .Include(B => B.CancellationPolicy)
                                                             .Include(B => B.Owner)
                                                             .Include(B => B.Renter)
                                                             .Where(B => B.OwnerId == RequesterId && B.ProductId != null)
                                                             .ToListAsync();

            return null;

        }

        public async Task<Booking?> GetByIdAsync(string role, int bookingId, string RequesterId)
        {
            if (role.ToLower() == "renter")
                return await _dbContext.Bookings.Include(B => B.CancellationPolicy)
                                                            .Include(B => B.Product)
                                                                .ThenInclude(pb => pb.Images)
                                                            .Include(B => B.Product)
                                                                .ThenInclude(pb => pb.Location)
                                                            .Include(B => B.Renter)
                                                            .Include(B => B.Owner)
                                                            .Where(B => B.RenterId == RequesterId)
                                                            .FirstOrDefaultAsync(B => B.BookingId == bookingId && B.ProductId != null);
            else if (role.ToLower() == "owner")
                return await _dbContext.Bookings.Include(B => B.CancellationPolicy)
                                                            .Include(B => B.Product)
                                                                .ThenInclude(pb => pb.Images)
                                                             .Include(B => B.Product)
                                                                .ThenInclude(pb => pb.Location)
                                                            .Include(B => B.Renter)
                                                            .Include(B => B.Owner)
                                                            .Where(B => B.OwnerId == RequesterId)
                                                            .FirstOrDefaultAsync(B => B.BookingId == bookingId && B.ProductId != null);

            return null;


        }
        public async Task<Booking?> UpdateAsync(string role, int bookingId, Booking updateModel, string requesterId)
        {
            var booking = await _dbContext.Bookings.Include(b => b.CancellationPolicy)
                                                    .Include(B => B.Product)
                                                    .Include(B => B.Renter)
                                                    .Include(B => B.Owner)
                                                    .Where(b => b.BookingId == bookingId && (b.OwnerId == requesterId || b.RenterId == requesterId) && b.ProductId != null)
                                                    .FirstOrDefaultAsync();
            if (booking == null)
            {
                throw new Exception("Booking is not found");

            }

            if (role.ToLower() == "owner" && booking.OwnerId == requesterId)
            {
                if (booking.Status.ToLower() == "pending")
                {
                    booking.StartDate = updateModel.StartDate;
                    booking.EndDate = updateModel.EndDate;
                    booking.FinalPrice = updateModel.FinalPrice;
                    booking.AdditionalInfo = updateModel.AdditionalInfo;
                    booking.CancellationPolicy.Refund = updateModel.CancellationPolicy.Refund;
                    booking.CancellationPolicy.PermittedDuration = updateModel.CancellationPolicy.PermittedDuration;

                    await _dbContext.SaveChangesAsync();
                }

                else if (booking.Status.ToLower() == "booked" && booking.PickUpCode == updateModel.PickUpCode)
                {
                    booking.PickUpDate = DateTime.Now;
                    booking.Status = "in-use";
                    booking.ReturnCode = new Random().Next(1000, 9999);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("either the pick up code is not correct or you are not allowed to make the change");
                }
            }

            else if (role.ToLower() == "renter" && booking.RenterId == requesterId)
            {
                if (booking.Status.ToLower() == "pending" && updateModel.Status.ToLower() == "booked")
                {
                    booking.Status = "booked";
                    booking.CreatedAt = DateTime.Now;
                    booking.PickUpCode = new Random().Next(1000, 9999);
                    await _dbContext.SaveChangesAsync();
                }
                else if (booking.Status.ToLower() == "in-use" && booking.ReturnCode == updateModel.ReturnCode)
                {
                    booking.ReturnDate = DateTime.Now;
                    booking.Status = "completed";
                    await _dbContext.SaveChangesAsync();
                }
                else if (booking.Status.ToLower() == "booked" && updateModel.Status.ToLower() == "cancelled")
                {
                    TimeSpan? timeDifference = booking.StartDate - DateTime.Now;
                    if (timeDifference.HasValue && timeDifference.Value.TotalHours >= booking.CancellationPolicy.PermittedDuration)
                    {
                        booking.Status = "cancelled";
                        await _dbContext.SaveChangesAsync();
                    }
                    else
                    {
                        throw new Exception("Due to the cancellation policy stated, you cannot cancel");
                    }
                }
                else
                {
                    throw new Exception("It is not allowed");
                }
            }
            else
            {
                return null;
            }

            return booking;
        }

    }
}