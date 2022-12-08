import React, { Component } from "react";
import { searchMoveis } from "../../redux/actions";
import { connect } from "react-redux";
import "./SearchBox.css";

class SearchBox extends Component {
  state = {
    searchLine: ""
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };
  handleClick = () => {
    const apiKey = "d1fc32c6";
    let movies = [];
    fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        movies = data.Search;
        this.props.searchMoveis(movies);
      });
  };

  render() {
    const { searchLine } = this.state;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
            onClick={() => this.handleClick()}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchMoveis: (searchLine) => dispatch(searchMoveis(searchLine))
});
export default connect(null, mapDispatchToProps)(SearchBox);
