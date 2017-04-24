const express = require('express')
const router = express.Router()
const app = express()
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('./db/db.json', {
  storage: fileAsync
})

app.use(express.static('./public'))


router.get('/movies', function (request, response) {
  const movies = db.get('movies')
  response.json(movies)
})

// router.get("/", function (request, response) {
//   response.json(api.getMovies())
// })

router.get('/movies/:id', function (request, response) {
  const name = request.params.id
  const movies = db.get('movies')
  response.json(movies.find({movieName: name}))
})

router.post('/movies', function (request, response) {
  db.get('movies')
    .push(request.body)
    .write()
    .then(allMovies => {
      response.json(allMovies)
    })
    .catch(err => {
      console.log(err)
    })
})

// router.post("/", function (request, response) {
//   api.addMovie(request.body)
//     .then((id) => {
//       response.json(api.getMovieById(id))
//     })
// })

router.patch('/movies/:id', function (request, response) {
  const movieId = request.params.id
  db.get('movies')
    .find({movieName: movieId})
    .assign(request.body)
    .write()
    .then(updatedMovie => {
      response.json(updatedMovie)
    })
    .catch(err => {
      console.log(err)
    })
})

// router.delete("/:id", function (request, response) {
//   api.deleteMovieById(request.params.id)
//     .then(() => response.sendStatus(204))
// })

router.delete('/movies/:id', function (request, response) {
  const deleteMovie = request.params.id
  db.get('movies')
    .remove({movieName: deleteMovie})
    .write()
    .then(removedMovie => {
      response.json(removedMovie)
    })
    .catch(err => {
      console.log(err)
    })
})


module.exports = router
