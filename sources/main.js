$(document).ready(function() {
  var movies = [];
  // Movie data table selector
  var $movieList = $('.movie-list');

  $.get('/movies')
  .then(getMovieData)
  .then(createMovieList)
  .catch(err => {
    console.log(err);
  });

  function getMovieData(data) {
    data.forEach(movie => {
      movies.push(movie);
    });
    return movies;
  }

  function createMovieList(movies) {
    movies.forEach(function(movie) {
      // Create elements for movie data
      var $currentMovie = $('<tr>').addClass('movie-list-item');
      var $titleLink = $('<a>').attr('href', '/show/' + movie.title).text(movie.title);
      var $title = $('<td>').append($titleLink);
      var $director = $('<td>').text(movie.director);
      var $year = $('<td>').text(movie.year);
      var $rating = $('<td>').text(movie.rating);

      // Buttons
      var $deleteBtn = $('<button>').addClass('btn btn-danger del-btn').text('Delete Movie');
      var $delTd = $('<td>').append($deleteBtn);
      var $editBtn = $('<a>').addClass('btn btn-info edit-btn').attr('href', '/edit/' + movie.title).text('Edit');
      var $editTd = $('<td>').append($editBtn);

      // Add data and buttons to table
      $currentMovie.append($title, $director, $year, $rating, $delTd, $editTd);
      $movieList.append($currentMovie);
    });
  }
});

$(document).on('click', '.del-btn', function() {
  var $currentMovie = $(this).parents('.movie-list-item');
  var $movieTitle = $currentMovie.find('>:first-child').text();
  var path = '/movies/' + $movieTitle;
  $.ajax({
    url: path,
    type: 'DELETE',
    success: () => {
      alert('Movie Deleted!');
      $currentMovie.remove();
    }
  })
  .then(console.log);
});

$(document).on('click', '.edit-btn', function() {
  var $currentMovie = $(this).parents('.movie-list-item');
  var $movieTitle = $currentMovie.find('>:first-child').text();
  $.get('/edit/' + $movieTitle)
  .then(console.log);
});
