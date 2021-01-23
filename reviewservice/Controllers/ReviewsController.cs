using reviewservice.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using reviewservice.Services;

namespace reviewservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ReviewService _reviewService;

        public ReviewsController(ReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public ActionResult<List<Review>> Get() =>
            _reviewService.Get();

        [HttpGet("{id:length(24)}", Name = "GetReview")]
        public ActionResult<Review> Get(string id)
        {
            var review = _reviewService.Get(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        [HttpPost]
        public ActionResult<Review> Create(Review review)
        {
            _reviewService.Create(review);

            return CreatedAtRoute("GetReview", new { id = review.Id.ToString() }, review);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Review reviewIn)
        {
            var review = _reviewService.Get(id);

            if (review == null)
            {
                return NotFound();
            }

            _reviewService.Update(id, reviewIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var review = _reviewService.Get(id);

            if (review == null)
            {
                return NotFound();
            }

            _reviewService.Remove(review.Id);

            return NoContent();
        }
    }
}