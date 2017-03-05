const router = require("express").Router()
const api = require("../db/api")

router.get("/", function (reqeust, response) {
  response.json(api.getMovies())
})

router.post("/", function (request, response) {
  api.addMovie(request.body)
    .then((id) => {
      response.json(api.getMovieById(id))
    })
})

router.delete("/:id", function (request, response) {
  api.deleteMovieById(request.params.id)
    .then(() => response.sendStatus(204))
})

module.exports = router
