using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PokeProject.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        static readonly HttpClient client = new HttpClient();

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {

            try
            {
                    HttpResponseMessage response = await client.GetAsync("https://pokeapi.co/api/v2/pokemon?offset=0&limit=101");
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            catch (HttpRequestException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult> Get(string id)
        {

            try
            {
                HttpResponseMessage response = await client.GetAsync("https://pokeapi.co/api/v2/pokemon/"+id);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            catch (HttpRequestException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
