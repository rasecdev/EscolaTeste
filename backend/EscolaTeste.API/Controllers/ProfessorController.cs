using EscolaTeste.API.Data;
using EscolaTeste.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace EscolaTeste.API.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repository;

        public ProfessorController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repository.GetAllProfessoresAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }


        [HttpGet("{professorId}")]
        public async Task<IActionResult> GetByAlunoId(int professorId)
        {
            try
            {
                var result = await _repository.GetProfessorAsyncById(professorId, true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("ByAluno/{alunoId}")]
        public async Task<IActionResult> GetByDisciplinaId(int alunoId)
        {
            try
            {
                var result = await _repository.GetProfessoresAsyncByAlunoId(alunoId, false);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Professor model)
        {
            try
            {
                _repository.Add(model);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{professorId}")]
        public async Task<IActionResult> put(int professorId, Professor model)
        {
            try
            {
                var professor = await _repository.GetProfessorAsyncById(professorId, false);

                if (professor == null)
                {
                    return NotFound();
                }

                _repository.Update(model);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{professorId}")]
        public async Task<IActionResult> delete(int professorId)
        {
            try
            {
                var professor = await _repository.GetProfessorAsyncById(professorId, false);

                if (professor == null)
                {
                    return NotFound();
                }

                _repository.Delete(professor);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(professor);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}
