$(document).ready(()=>{
  $('#searchForm').on('submit',(e)=>{
    e.preventDefault();
    let searchText=$('#searchText').val();
    getMovie(searchText);
  })
})

function getMovie(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=thewdb')
  .then((response)=>{
    console.log(response);
    let movies=response.data.Search;
    let output='';
    $.each(movies,(index,movie)=>{
      output+=`
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <a href="#" onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
          </div>
        </div>
      `;
    });
    $('#root').html(output);
  })
  .catch((err)=>{
    console.log(err);
  })

}
function movieSelected(id){
  sessionStorage.setItem('movieId',id);
  window.location='movie.html';
  return false;
}


function getMovieDetail(){
  let movieId=sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb')
  .then((response)=>{
    console.log(response);
    let movie=response.data;
    let output='';
    output+=`
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item">Genre: ${movie.Genre}</li>
            <li class="list-group-item">Released: ${movie.Released}</li>
            <li class="list-group-item">Country: ${movie.Country}</li>
            <li class="list-group-item">Language: ${movie.Language}</li>
            <li class="list-group-item">Director: ${movie.Director}</li>
            <li class="list-group-item">Actors: ${movie.Actors}</li>
            <li class="list-group-item">Runtime: ${movie.Runtime}</li>
            <li class="list-group-item">Production: ${movie.Production}</li>
          </ul>
          <h4>Plot</h4>
          <p>${movie.Plot}</p>
          <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary" target="_blank">View on IMDB</a>
          <a href="index.html" class="btn btn-default">Back to Search</a>
        </div>

      </div>
    `;
    $('#root').html(output);
  })
  .catch((err)=>{
    console.log(err);
  })
}
