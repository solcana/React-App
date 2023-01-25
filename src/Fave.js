import React, { Component } from "react";

export class Fave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isFavorite: !prevState.isFavorite,
    }));
    this.props.onClickFave(this.props.beer);
  };

  render() {
    return (
      <div className="beerFave">
        <button className="faveButton" onClick={this.handleClick}>
          {this.state.isFavorite ? "Remove from Fave" : "Add to Fave"}
        </button>
      </div>
    );
  }
}

export default Fave;
