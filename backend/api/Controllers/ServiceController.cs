using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.Service;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("service")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        public ServiceController(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
            
        }
        [HttpGet]
        public async Task<IActionResult> GetAllServices() {
            try
            {
                var serviceModels = await _serviceRepository.GetAllAsync();
                
                var serviceDtos = serviceModels.Select(S => S.ToServiceDtoFromService());
                return Ok(serviceDtos);
            }
            catch (Exception ex)
            {
                    
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var serviceModel = await _serviceRepository.GetByIdAsync(id);
            if (serviceModel == null) {
                return NotFound();
            }

            return Ok(serviceModel.ToServiceDtoFromService());
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] ServiceCreateDto serviceCreateDto) {

            try
            {
                if (!ModelState.IsValid) {
                return BadRequest(ModelState);
                }
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var serviceModel = serviceCreateDto.ToServiceFromServiceCreateDto();

                if (userId == null) {
                    return Unauthorized();
                }

                serviceModel.OwnerId = userId;

                var created = await _serviceRepository.CreateAsync(serviceModel);
                if (created == null) {
                    return BadRequest("The category does not exist");
                }         
                return CreatedAtAction(nameof(GetById), new {id = serviceModel.ServiceId}, serviceModel.ToServiceDtoFromService());
                
            }
            catch (Exception ex)
            {
                
                 return BadRequest(new { message = ex.Message });
            }
            
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] ServiceUpdateDto serviceUpdateDto) {
            try
            {
                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
               var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
               var updatedService = await _serviceRepository.UpdateAsync(id, serviceUpdateDto, userId);

               if (updatedService == null) {
                return NotFound();
               }

               return Ok(updatedService.ToServiceDtoFromService());
            }
            catch (Exception ex)
            {
                
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var serviceModel = await _serviceRepository.DeleteAsync(id, userId);
                if (serviceModel == null) {
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