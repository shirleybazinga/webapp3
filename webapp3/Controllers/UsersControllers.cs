using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using webapp3.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using webapp3.Services;
using webapp3.Entities;
using webapp3.Models.Users;

namespace webapp3.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password, _appSettings.Secret);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            // return basic user info and authentication token
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("encryptionKey")]
        public IActionResult EncryptionKey()
        {
            return Ok(new { key = _userService.GetEncryptionKey() });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            try
            {
                // create user
                _userService.Create(user, model.Password);
                return Ok(new { message = "You have registered successfully. Please login." });
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                var obj = new { message = ex.Message };
                if (ex is UsernameException)
                    return Conflict(obj);
                else if (ex is PasswordException)
                    return UnprocessableEntity(obj);
                else
                    return BadRequest(obj);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update user 
                _userService.Update(user, model.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}