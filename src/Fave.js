import React, { Component } from "react";

export class Fave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }
  handleClick = (e) => {
    console.log("handling Fave click");
    this.setState((prevState) => {
      return { isFavorite: !prevState.isFavorite };
    });
  };

  render() {
    return (
      <div className="beerFave">
        <button className="faveIcon" onClick={this.handleClick}>
          {this.state.isFavorite ? "Remove from Fave" : "Add to Fave"}
        </button>
      </div>
    );
  }
}

export default Fave;
