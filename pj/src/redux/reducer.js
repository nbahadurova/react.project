const inititial = {
  movies: [],
  favoriteList: [],
  title: "",
  listID: "",
  listMovies: [],
  movieDetails: []
};

export default function reducer(state = inititial, action) {
  switch (action.type) {
    case "SEARCH_MOVIES": {
      const movies = action.payload.movies;
      return {
        ...state,
        movies: movies
      };
    }

    case "ADD_FAVORITE_FILM": {
      const film = state.movies.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      let favoriteList = [...state.favoriteList, { ...film }];
      return {
        ...state,
        favoriteList
      };
    }

    case "REMOVE_FAVORITE_FILM":
      const newFilms = state.favoriteList.filter(
        (item) => item.imdbID !== action.payload.imdbID
      );
      return { ...state, favoriteList: newFilms };

    case "REGISTER_FAVORITES":
      return {
        ...state,
        listID: action.payload.listID
      };
    case "GET_LIST_INTO_STATE":
      return {
        ...state,
        title: action.payload.title,
        listMovies: action.payload.listMovies
      };
    case "GET_MOVIE_INFO_INTO_STATE":
      return {
        ...state,
        movieDetails: action.payload.movieDetails
      };
    default:
      return state;
  }
}
