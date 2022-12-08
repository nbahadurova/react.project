import React, { Component } from "react";
import "./Favorites.css";
import store from "../../redux/store";
import FavoritesItems from "./FavoritesItems";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postList } from "../../redux/actions";

class Favorites extends Component {
  state = {
    title: "",
    movies: [],
    isSbm: false
  };
  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        movies: [...state.favoriteList]
      });
    });
  }
  favoriteChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };
  saveListHandler = () => {
    this.setState({ isSbm: true });
    this.props.postList(this.state.title, this.getImdbIDArray());
  };
  getImdbIDArray = () => {
    let favoritesIDArray = this.props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };

  render() {
    return (
      <div className="favorites">
        <input
          value={this.state.title}
          className="favorites__name"
          onChange={this.favoriteChangeHandler}
          disabled={this.state.isSbm}
        />
        <ul className="favorites__list">
          {this.state.movies.map((item) => (
            <li key={item.imdbID}>
              <FavoritesItems {...item} />
            </li>
          ))}
        </ul>

        {!this.state.isSbm ? (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveListHandler}
          >
            Сохранить список
          </button>
        ) : (
          <button type="button" className="favorites__save">
            <Link
              to={"/list/" + this.props.listID}
              target="_blank"
              className="link-to__list"
            >
              Перейти к выбранным фильмам
            </Link>
          </button>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
