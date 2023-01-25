import React, { Component } from "react";
import "./App.css";
import Beer from "./Beer";
import BeerDescription from "./BeerDescription";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      malt: "",
      beerData: [],
      selectedBeer: null,
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      malt: value,
    });
    console.log(value);
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

  render() {
    const beers = this.state.beerData.map((item, index) => {
      console.log(item, index);
      return (
        <div onClick={() => this.handleClick(item)}>
          <Beer beer={item} key={index} />
        </div>
      );
    });
    const selectedBeer = this.state.selectedBeer;
    return (
      <div className="main-body">
        <nav>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search beer"
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </form>
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
