import React, { Component } from "react";

export class Cocktail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.beer) return null;
    return (
      <>
        <h3>{this.props.beer.name}</h3>
        <h4>{this.props.beer.description}</h4>
        <p>{this.props.beer.abv}</p>
      </>
    );
  }
}

export default Cocktail;
