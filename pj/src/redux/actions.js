export const searchMoveis = (movies) => ({
  type: "SEARCH_MOVIES",
  payload: {
    movies: movies
  }
});

export function addFavoriteList(imdbID) {
  return {
    type: "ADD_FAVORITE_FILM",
    payload: {
      imdbID: imdbID
    }
  };
}

export function removeFilm(imdbID) {
  return {
    type: "REMOVE_FAVORITE_FILM",
    payload: {
      imdbID: imdbID
    }
  };
}

export function registerFavoriteList(listID) {
  return {
    type: "REGISTER_FAVORITES",
    payload: {
      listID: listID
    }
  };
}

export function postList(title, favoritesIDArray) {
  return function (dispatch) {
    let savedList = {
      title: title,
      movies: favoritesIDArray
    };
    fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(savedList)
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(registerFavoriteList(data.id));
      });
  };
}

export function getListIntoState(title, movies) {
  return {
    type: "GET_LIST_INTO_STATE",
    payload: {
      title: title,
      listMovies: movies
    }
  };
}

export function getList(imdbID) {
  return function (dispatch) {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getListIntoState(data.title, data.movies));
        dispatch(getMovieInfoByImdbID(data.movies));
      });
  };
}

export function getMovieInfoToState(movieDetails) {
  return {
    type: "GET_MOVIE_INFO_INTO_STATE",
    payload: {
      movieDetails: movieDetails
    }
  };
}

export function getMovieInfoByImdbID(movies) {
  return function (dispatch) {
    let movieDetailsArray = [];
    movies.forEach((e) => {
      fetch(`https://www.omdbapi.com/?i=${e}&apikey=bfa19603`)
        .then((res) => res.json())
        .then((data) => {
          movieDetailsArray = [...movieDetailsArray, { ...data }];
          dispatch(getMovieInfoToState(movieDetailsArray));
        });
    });
  };
}
