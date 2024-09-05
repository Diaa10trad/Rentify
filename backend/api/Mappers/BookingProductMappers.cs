using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking.BookingProduct;
using api.Models;

namespace api.Mappers
{
    public static class BookingProductMappers
    {
        public static BookingProductForOwnerDto FromBookingToBookingProductForOwnerDto(this Booking bookingModel)
        {
            return new BookingProductForOwnerDto
            {

                BookingId = bookingModel.BookingId,
                Owner = bookingModel.Owner.ToUserBookingDtoFromAppUser(),
                Renter = bookingModel.Renter.ToUserBookingDtoFromAppUser(),
                Product = bookingModel.Product?.ToProductBookingDtoFromProduct(),
                StartDate = bookingModel.StartDate,
                EndDate = bookingModel.EndDate,
                FinalPrice = bookingModel.FinalPrice,
                AdditionalInfo = bookingModel.AdditionalInfo,
                Status = bookingModel.Status,
                ReturnCode = bookingModel.ReturnCode,
                PickUpDate = bookingModel.PickUpDate,
                ReturnDate = bookingModel.ReturnDate,
                CreatedAt = bookingModel.CreatedAt,
                CancellationPolicy = bookingModel.CancellationPolicy,
            };
        }

        public static BookingProductForRenterDto FromBookingToBookingProductForRenterDto(this Booking bookingModel)
        {
            return new BookingProductForRenterDto
            {

                BookingId = bookingModel.BookingId,
                Owner = bookingModel.Owner.ToUserBookingDtoFromAppUser(),
                Renter = bookingModel.Renter.ToUserBookingDtoFromAppUser(),
                Product = bookingModel.Product?.ToProductBookingDtoFromProduct(),
                StartDate = bookingModel.StartDate,
                EndDate = bookingModel.EndDate,
                FinalPrice = bookingModel.FinalPrice,
                AdditionalInfo = bookingModel.AdditionalInfo,
                Status = bookingModel.Status,
                PickUpDate = bookingModel.PickUpDate,
                ReturnDate = bookingModel.ReturnDate,
                PickUpCode = bookingModel.PickUpCode,
                CreatedAt = bookingModel.CreatedAt,
                CancellationPolicy = bookingModel.CancellationPolicy,
            };
        }
        public static Booking ToBookingFromBookingProductCreateDto(this BookingProductCreateDto createDto)
        {
            return new Booking
            {
                OwnerId = createDto.OwnerId,
                RenterId = createDto.RenterId,
                ProductId = createDto.ProductId,
                StartDate = createDto.StartDate,
                EndDate = createDto.EndDate,
                FinalPrice = createDto.FinalPrice,
                AdditionalInfo = createDto.AdditionalInfo,
                CancellationPolicy = new CancellationPolicy { Refund = createDto.Refund, PermittedDuration = createDto.PermittedDuration },
            };
        }

        public static Booking ToBookingFromBookingProductOwnerUpdateDto(this BookingProductOwnerUpdateDto updateDto)
        {
            return new Booking
            {
                StartDate = updateDto.StartDate,
                EndDate = updateDto.EndDate,
                FinalPrice = updateDto.FinalPrice,
                AdditionalInfo = updateDto.AdditionalInfo,
                CancellationPolicy = new CancellationPolicy { Refund = updateDto.Refund, PermittedDuration = updateDto.PermittedDuration },
            };
        }
    }
}