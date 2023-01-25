import React, { Component } from "react";
import "./App.css";
import Beer from "./Beer";
import BeerDescription from "./BeerDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      malt: "",
      beerData: [],
      selectedBeer: null,
      favoriteList: [],
      favoritesCount: 0,
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      malt: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://api.punkapi.com/v2/beers?malt=${this.state.malt}`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then((results) => {
        console.log(results);
        this.setState({ beerData: results });
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  handleClick = (item) => {
    this.setState({ selectedBeer: item });
  };

  updateFavoriteList = (beer) => {
    console.log(beer);
    this.setState(
      (prevState) => {
        if (!prevState.favoriteList.includes(beer)) {
          return {
            favoriteList: [...prevState.favoriteList, beer],
            favoritesCount: prevState.favoritesCount + 1,
          };
        } else {
          return {
            favoriteList: prevState.favoriteList.filter(
              (beers) => beers !== beer
            ),
            favoritesCount: prevState.favoritesCount - 1,
          };
        }
      },
      () => console.log(this.state.favoriteList, this.state.favoritesCount)
    );
  };

  render() {
    const beers = this.state.beerData.map((item, index) => {
      return (
        <div onClick={() => this.handleClick(item)}>
          <Beer
            beer={item}
            key={index}
            onFavoriteClick={() => this.updateFavoriteList(item)}
          />
        </div>
      );
    });
    const selectedBeer = this.state.selectedBeer;
    return (
      <div className="main-body">
        <nav>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search beer"
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </form>
          <div className="heartIcon">
            <FontAwesomeIcon icon={faHeart} />
            {this.state.favoritesCount}
          </div>
        </nav>
        <div className="card-container">
          <div className="first-column">{beers}</div>
          <div className="second-column">
            {selectedBeer && (
              <BeerDescription beer={selectedBeer} key={selectedBeer.id} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;