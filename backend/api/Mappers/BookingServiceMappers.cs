using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking.BookingService;
using api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Mappers
{
    public static class BookingServiceMappers
    {
        public static BookingServiceForOwnerDto FromBookingToBookingServiceForOwnerDto(this Booking bookingModel)
        {
            return new BookingServiceForOwnerDto
            {

                BookingId = bookingModel.BookingId,
                Owner = bookingModel.Owner.ToUserBookingDtoFromAppUser(),
                Renter = bookingModel.Renter.ToUserBookingDtoFromAppUser(),
                Service = bookingModel.Service?.ToServiceBookingDtoFromService(),
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

        public static BookingServiceForRenterDto FromBookingToBookingServiceForRenterDto(this Booking bookingModel)
        {
            return new BookingServiceForRenterDto
            {

                BookingId = bookingModel.BookingId,
                Owner = bookingModel.Owner.ToUserBookingDtoFromAppUser(),
                Renter = bookingModel.Renter.ToUserBookingDtoFromAppUser(),
                Service = bookingModel.Service?.ToServiceBookingDtoFromService(),
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
        public static Booking ToBookingFromBookingServiceCreateDto(this BookingServiceCreateDto createDto)
        {
            return new Booking
            {
                OwnerId = createDto.OwnerId,
                RenterId = createDto.RenterId,
                ServiceId = createDto.ServiceId,
                StartDate = createDto.StartDate,
                EndDate = createDto.EndDate,
                FinalPrice = createDto.FinalPrice,
                AdditionalInfo = createDto.AdditionalInfo,
                CancellationPolicy = new CancellationPolicy { Refund = createDto.Refund, PermittedDuration = createDto.PermittedDuration },
            };
        }

        public static Booking ToBookingFromBookingServiceOwnerUpdateDto(this BookingServiceOwnerUpdateDto updateDto)
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