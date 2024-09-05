using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Booking.BookingProduct;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Authorize]
    [Route("api/booking-product")]
    [ApiController]
    public class BookingProductController : ControllerBase
    {
        private readonly IBookingProductRepository _bookingRepository;
        public BookingProductController(IBookingProductRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpGet("{role}/{bookingId}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] string role, [FromRoute] int bookingId)
        {
            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (role != "renter" && role != "owner")
            {
                return BadRequest("Invalid Request");
            }

            var bookingModel = await _bookingRepository.GetByIdAsync(role, bookingId, RequesterId);
            if (bookingModel == null)
            {
                return NotFound();
            }
            object bookingDto = role == "renter" ? bookingModel.FromBookingToBookingProductForRenterDto()
                                                 : bookingModel.FromBookingToBookingProductForOwnerDto();
            return Ok(bookingDto);

        }

        [HttpGet("{role}")]
        [Authorize]
        public async Task<IActionResult> GetAll([FromRoute] string role)
        {
            var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (role != "renter" && role != "owner")
            {
                return BadRequest("Invalid Request");
            }

            var bookingModels = await _bookingRepository.GetAllAsync(role, RequesterId);

            if (bookingModels == null)
            {
                return NotFound();
            }
            object bookingDtos = role == "renter" ? bookingModels.Select(b => b.FromBookingToBookingProductForRenterDto()).ToList()
                                                 : bookingModels.Select(b => b.FromBookingToBookingProductForOwnerDto()).ToList();

            return Ok(bookingDtos);

        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] BookingProductCreateDto bookingDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var createdBooking = await _bookingRepository.CreateAsync(bookingDto.ToBookingFromBookingProductCreateDto(), RequesterId);
                if (createdBooking == null)
                {
                    return BadRequest("The Booking Is Not Created");
                }

                return CreatedAtAction(nameof(GetById), new { role = "owner", bookingId = createdBooking.BookingId }, createdBooking);


            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut("{bookingId}")]
        [Authorize]
        public async Task<IActionResult> UpdateBookingForOwner([FromRoute] int bookingId, [FromBody] BookingProductOwnerUpdateDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updateModel = updateDto.ToBookingFromBookingProductOwnerUpdateDto();

                var updatedBooking = await _bookingRepository.UpdateAsync("owner", bookingId, updateModel, RequesterId);

                if (updatedBooking == null)
                {
                    return BadRequest(new { Message = "Update failed or booking not found." });
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut("{bookingId}/confirm-pickup")]
        [Authorize]
        public async Task<IActionResult> ConfirmPickUpBookingForOwner([FromRoute] int bookingId, [FromBody] int pickupCode)
        {
            try
            {
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updateModel = new Booking
                {
                    PickUpCode = pickupCode
                };

                var updatedBooking = await _bookingRepository.UpdateAsync("owner", bookingId, updateModel, RequesterId);

                if (updatedBooking == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{bookingId}/confirm-return")]
        [Authorize]
        public async Task<IActionResult> CompleteBookingForRenter([FromRoute] int bookingId, [FromBody] int returnCode)
        {
            try
            {
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updateModel = new Booking
                {
                    ReturnCode = returnCode
                };

                var updatedBooking = await _bookingRepository.UpdateAsync("renter", bookingId, updateModel, RequesterId);

                if (updatedBooking == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut("{bookingId}/book")]
        [Authorize]
        public async Task<IActionResult> MakeBookingForRenter([FromRoute] int bookingId)
        {
            try
            {
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updateModel = new Booking
                {
                    Status = "booked"
                };

                var updatedBooking = await _bookingRepository.UpdateAsync("renter", bookingId, updateModel, RequesterId);

                if (updatedBooking == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpPut("{bookingId}/cancel")]
        [Authorize]
        public async Task<IActionResult> CancelBookingForRenter([FromRoute] int bookingId)
        {
            try
            {
                var RequesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var updateModel = new Booking
                {
                    Status = "cancelled"
                };

                var updatedBooking = await _bookingRepository.UpdateAsync("renter", bookingId, updateModel, RequesterId);

                if (updatedBooking == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [HttpDelete("{bookingId}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int bookingId)
        {
            try
            {
                var requesterId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var bookingModel = await _bookingRepository.DeleteAsync(bookingId, requesterId);
                if (bookingModel == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}