import React, { Component } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";
import { connect } from "react-redux";

class Movies extends Component {
  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie) => (
          <li className="movies__item" key={movie.imdbID}>
            <MovieItem
              {...movie}
              // disabled={this.props.filmList.find(el => el.imdbID === movie.imdbID)}
            />
          </li>
        ))}
      </ul>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    filmList: state.filmList
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
