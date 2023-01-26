import React, { Component } from "react";
import "./App.css";
import Beer from "./Beer";
import BeerDescription from "./BeerDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    console.log("👋 This is App.updateFavoriteList", beer);
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

  clearFavorites = () => {
    this.setState({
      favoriteList: [],
      favoritesCount: 0,
    });
  };

  addNewItem = () => {
    const name = prompt("Enter a new beer name");
    const myNewBeer = {
      name: name,
      tagline: this.state.beerData[0].tagline,
      description: this.state.beerData[0].description,
      abv: <img src={this.state.beerData[0].image_url}></img>,
    };
    this.setState(
      { beerData: [myNewBeer].concat(this.state.beerData) },
      () => {}
    );
  };

  render() {
    const beers = this.state.beerData.map((item, index) => {
      return (
        <div onClick={() => this.handleClick(item)} key={index}>
          <Beer
            isFave={this.state.favoriteList.includes(item)}
            beer={item}
            onFavoriteClick={() => {
              return this.updateFavoriteList(item);
            }}
          />
        </div>
      );
    });
    const selectedBeer = this.state.selectedBeer;
    return (
      <div className="main-body">
        <nav className="navBar">
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
          <button className="clearFavsButton" onClick={this.clearFavorites}>
            Clear favorites
          </button>
          <button className="addNewItemBtn" onClick={this.addNewItem}>
            Add item
          </button>
        </nav>
        <div className="card-container">
          <div className="first-column">{beers}</div>
          <div className="second-column">
            {selectedBeer && (
              <BeerDescription beer={selectedBeer} key={selectedBeer.name} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
